import * as d3 from 'd3';
import { annotation,  annotationLabel, annotationCalloutCurve } from 'd3-svg-annotation';
import { legendColor } from 'd3-svg-legend';

export async function createChart(element){
   const data = await d3.csv('data/superbowl_halftime_1.csv', (d)=>{
      return {
         away_team: d.away_team_name,
         home_team:d.home_team_name,
         away_team_score: Number(d.away_team_score),
         year:d.year,
         sb_number:Number(d.sb_number),
         home_team_score:Number(d.home_team_score),
         difference: Number(d.difference),
         halftime_win: d.halftime_win === 'yes'?true:d.halftime_win === 'no'?false:null

      }
   })
  
  const avgDiff = calculateAvg(data);
  const comebackData = data.filter(d=> d.halftime_win===false)
  const averageComebackDiff = calculateAvg(comebackData);

   const teamNamesData = await d3.csv('data/nfl.csv');
   console.log('ths is the data', teamNamesData)
   console.log(data)
   const teamNames = new Map();
   teamNamesData.forEach(d=>{
      teamNames.set(d.Name, d.Abbreviation);
   })
   const numberSort = data.sort((a,b)=> a.sb_number - b.sb_number)
   const  newData =  numberSort.sort((a,b)=> a.difference - b.difference)

   const margin ={t:20,r:20,b:20,l:110};
   const height = 800 - (margin.r + margin.l);
   const width = 875 - (margin.t + margin.b);
   const svg = d3.select(element).append('svg').attr('height', height + (margin.r + margin.l)).attr('width', width + (margin.l + margin.r));

   const mainG = svg.append('g').attr('transform', `translate(${margin.l},${margin.t})`)

   //scales
   const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.difference)]).range([0,width]);

  

   const yScale = d3.scalePoint([0,...newData.map(d=>d.sb_number)], [height,0]);

   //axes
   mainG.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

   mainG.append('g').attr('class', 'x-axis')
                        .attr('transform', `translate(0, ${height})`)
                        .call(d3.axisBottom(xScale).tickValues([3,7,10,13,17,21,24]))
                        .call(g => g.selectAll(".tick line").clone()
                        .attr("y1", -height)
                        .attr("stroke-opacity", 0.1));

   //visualizations
   //away
  
   // mainG.append('g').selectAll('.home-circles').data(data).join('circle')
   //                            .attr('cx', d=>xScale(d.home_team_score)).attr('cy',d=>yScale(d.sb_number))
   //                            .attr('r', 3).attr('fill', 'grey')

   mainG.append('g').selectAll('.line-avg-main').data([averageComebackDiff]).join('line')
                              .attr('class','.line-avg-main')
                              .attr('x1',d=>xScale(d)).attr('x2', d=> xScale(d))
                              .attr('y1', d=>yScale(0) ).attr('y2', -5)
                              .attr('stroke', 'grey')
                              .attr('stroke-dasharray', '5 3')

   //line
   mainG.append('g').selectAll('.dif-lines').data(data).join('line')
                              .attr('x1',xScale(0)).attr('x2', d=> xScale(d.difference))
                              .attr('y1', d=>yScale(d.sb_number)).attr('y2', d=>yScale(d.sb_number))
                              .attr('stroke', 'grey')

   mainG.append('g').selectAll('.home-circles').data(data).join('circle')
                              .attr('cx', d=>xScale(d.difference)).attr('cy',d=>yScale(d.sb_number))
                              .attr('r', 3).attr('fill', d => d.halftime_win?'red':d.halftime_win===null?'grey':'green')
//home

   //scores
   mainG.append('g').selectAll('.score-text').data(data).join('text')
                                 .attr('x', d=> xScale(0)).attr('y',d=>yScale(d.sb_number))
                                 .attr('transform', 'translate(-110,3)')
                                 .style('font-size', '10px').style('fill', 'black')

                                 .text(d=>`${teamNames.get(d.away_team)} ${d.away_team_score} - ${d.home_team_score} ${teamNames.get(d.home_team)}`) 
                                 
   //add average scoress
  console.log(avgDiff)
   //average halftime difference
   mainG.append('g').selectAll('.line-avg-main').data([avgDiff]).join('line')
                              .attr('class','.line-avg-main')
                              .attr('x1',d=>xScale(d)).attr('x2', d=> xScale(d))
                              .attr('y1', d=>yScale(0) ).attr('y2', -5)
                              .attr('stroke', 'grey')
                              .attr('stroke-dasharray', '5 3')

   //annotations
   const KCAnnoData = data.filter(d=>d.sb_number === 59);
   const kcType = annotationLabel;
   const kcAnnotation = [
      {
        note: {
          label: "This deficit was historic, second all time, 13 more than average, and the largest deficit while also being shut out.",
          title: "KC's 24 point Deficit",
          wrap:200
        },
        data:KCAnnoData[0],
        connector: {
          end: "arrow",        // Can be none, or arrow or dot
          type: "line",      // ?? don't know what it does
          lineType : "vertical",    // ?? don't know what it does
          //endScale: 2     // dot size
        },
        color: ["grey"],
        dy: 70,
        dx: -70

      }
   ]
   
const makeKCAnno = annotation().notePadding(0).type(kcType).accessors({
   x: d => xScale(d.difference) -3,
   y: d => yScale(d.sb_number) + 3,
 }).annotations(kcAnnotation);

mainG.append('g').attr('class', 'kc-annotation').call(makeKCAnno);

//NE Patriots annotation


const NEAnnoData = data.filter(d=>d.sb_number === 51);
   const NEType = annotationLabel;
   const NEAnnotation = [
      {
        note: {
          label: "This deficit was twice as much as the average overall halftime defecit, and 3x larger than the average half time comeback. No team before than had overcame a 7 point halftime defecit.",
          title: "New Englands 18 point Halftime Comeback Win",
          wrap:200
        },
        data:NEAnnoData[0],
        connector: {
          end: "arrow",        // Can be none, or arrow or dot
          type: "line",      // ?? don't know what it does
          lineType : "vertical",    // ?? don't know what it does
          //endScale: 2     // dot size
        },
        color: ["grey"],
        dy: 150,
        dx: -50

      }
   ]
   
const makeNEAnno = annotation().notePadding(0).type(NEType).accessors({
   x: d => xScale(d.difference)-4,
   y: d => yScale(d.sb_number) + 4,
 }).annotations(NEAnnotation);

mainG.append('g').attr('class', 'NE-annotation').call(makeNEAnno);

//NE Patriots annotation


const AVGAnnoData = data.filter(d=>d.sb_number === 13);
   const AVGType = annotationLabel;
   const AVGAnno = [
      {
        note: {
          label: "",
          title: "The Most common half time defecit comeback is 7 points.",
          wrap:200
        },
        data:AVGAnnoData[0],
        connector: {
          end: "arrow",        // Can be none, or arrow or dot
          type: "line",      // ?? don't know what it does
          lineType : "vertical",    // ?? don't know what it does
          //endScale: 2     // dot size
        },
        color: ["grey"],
        dy: 80,
        dx: 75

      }
   ]
   
const makeAVGAnno = annotation().notePadding(0).type(AVGType).accessors({
   x: d => xScale(d.difference)+ 8,
   y: d => yScale(d.sb_number) + 4,
 }).annotations(AVGAnno);

mainG.append('g').attr('class', 'AVG-annotation').call(makeAVGAnno);

//text for averages



  //const averageComebackDiff = calculateAvg(comebackData);


mainG.append('g').selectAll('.avg-diff-class').data([avgDiff]).join('text')
                                              .attr('x', d=>xScale(d) +5).attr('y', yScale(0)-2).text('<- Avg Halftime Deficit')
                                              .attr('fill', 'grey')
                                              .style('font-size', '10px')

mainG.append('g').selectAll('.avg-comeback-class').data([averageComebackDiff]).join('text')
                                               .attr('x', d=>xScale(d) - 182.17 ).attr('y', yScale(0)-2).text('Avg Comback Win Halftime Deficit ->')
                                               .attr('fill', 'grey')
                                               .style('font-size', '10px')

mainG.append('g').selectAll('.avg-diff-class').data([avgDiff]).join('text')
                                               .attr('x', d=>xScale(d) +2).attr('y', -1).text(d=> "<-"+d.toFixed(1))
                                               .attr('fill', 'grey')
                                               .style('font-size', '10px')

 mainG.append('g').selectAll('.avg-comeback-class').data([averageComebackDiff]).join('text')
                                                .attr('x', d=>xScale(d)-28).attr('y', -1).text(d=>d.toFixed(1)+'->')
                                                .attr('fill', 'grey')
                                                .style('font-size', '10px')

mainG.append('g').selectAll('.label-score').data(["Halftime Score"]).join('text')
                                             .attr('x',-margin.l).attr('y', -12).text(d=>d)
                                             .attr('fill', 'grey')
                                             .style('font-size', '10px')

mainG.append('g').selectAll('.label-score').data(["SB#"]).join('text')
                                             .attr('x',-22).attr('y', -12).text(d=>d)
                                             .attr('fill', 'grey')
                                             .style('font-size', '10px')

mainG.append('g').selectAll('.label-score').data(["SB HalfTime Score Difference"]).join('text')
                                             .attr('x', width-145.75).attr('y', height-1).text(d=>d)
                                             .attr('fill', 'grey')
                                             .style('font-size', '10px')

//legend                                       
const legendScale = d3.scaleOrdinal(['team up at half won game', 'team down at half won game', 'tied'],['red','green','grey'])

const legendOrdinal = legendColor().shape('path',d3.symbol().type(d3.symbolCircle).size(25)()).shapePadding(5).scale(legendScale);

mainG.append('g').attr('class', 'legend').attr('transform', `translate(${width-155},${height-75})`).style('font-size', '10px').call(legendOrdinal);
d3.select('.legend').selectAll('.label').attr('fill','grey')
d3.select('.legend').selectAll('path').attr('transform','translate(0,1.65)')


}






const calculateAvg = (data) =>{
   let total = 0;
   data.forEach(d=>{
      total += d.difference;
   })

   let avg = total/data.length;

   return avg;
}