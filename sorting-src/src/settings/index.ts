import graphColors from './graphColor/_index';
import graphTypes from './graphType/_index';
import sampleTypes from './sampleType/_index';
import sampleOrders from './sampleOrder/_index';
import sortingAlgorithms from './sortingAlgorithm/_index';

export { graphColors, graphTypes, sampleOrders, sampleTypes, sortingAlgorithms};

export const settings = {
	SortingAlgorithm: 'Quick Sort',
	SortSpeed: 4,
	SampleSize: 256,
	GraphType: 'Bar Graph',
	GraphColor: 'Rainbow',
	SampleType: 'Linear',
	SampleOrder: 'Random',
	ShowSweeper: true,

};

export const defaultSettings = {
	SortingAlgorithm: sortingAlgorithms[Math.floor(Math.random() * sortingAlgorithms.length)].name,
	SortSpeed: 1,
	SampleSize: 8,
	GraphType: graphTypes.findIndex(e => e.name === 'Bar Graph'),
	GraphColor: graphColors.findIndex(e => e.name === 'Rainbow'),
	SampleType: sampleTypes.findIndex(e => e.name === 'Linear'),
	SampleOrder: sampleOrders.findIndex(e => e.name === 'Random'),
	ShowSweeper: 1,

};
