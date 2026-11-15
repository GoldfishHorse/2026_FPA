import { GenerateCoordinates } from './generateCoordinates';
import { RenderGraph } from './renderGraph';
import { sortingAlgorithms, settings } from '../settings';
import { HomeComponent } from 'src/app/home/home.component';
import { isArraySorted } from './utils';

/**
 * Stops sorting. Adds an error message and stops the graph.
 * @param {HomeComponent} app - The component containing app variables.
 * @param {string} message - The error message.
 */
const suspendSorting = (app: HomeComponent, graphData: any, message?: string) => {
	graphData.done = true;
	if (typeof message === 'string') app.ErrorMessage = 'Error: ' + message;
	window.clearInterval(app.SortingInterval);
	RenderGraph(app.Coordinates, 'mustRender', graphData);
	return;
};

/**
 * Starts visualizing sorting algorithms
 * @param {HomeComponent} app - The component containing app variables.
 */
export const sortGraph = (app: HomeComponent) => {

	app.Coordinates = GenerateCoordinates();

	let data: any = {};
	const graphData: any = {};

	data.settings = {};
	data.settings.sortingSpeed = settings.SortSpeed;
	graphData.settings = {};
	switch (settings.GraphType) {
		case 'History Graph': {
			graphData.settings.sampleSize = settings.SampleSize;
		}
	}

	app.ErrorMessage = undefined;

	RenderGraph(app.Coordinates, 'regularRender', graphData);

	const sortingAlgorithm = sortingAlgorithms.find(e => e.name === settings.SortingAlgorithm);
	if (sortingAlgorithm === undefined) return suspendSorting(app, {}, 'Sorting Algorithm not found');

	const sortDescription = document.getElementById('StatisticsSortDescription');
	const sortExample = document.getElementById('StatisticsSortExample');
	if (sortDescription instanceof HTMLElement) sortDescription.innerText = sortingAlgorithm.name + ' description: ' + sortingAlgorithm.description;
	if (sortExample instanceof HTMLElement) sortExample.innerText = sortingAlgorithm.name + ' example: ' + sortingAlgorithm.example;

	let speedPass = 1;
	let speed = settings.SortSpeed;
	if (speed <= 0) speed = 4;
	while (speed < 4) {
		speed *= 2;
		speedPass++;
	}

	app.SortingInterval = window.setInterval(() => {

		if (app.Coordinates === undefined) return suspendSorting(app, graphData, 'There is not enough valid data points to sort.');

		if (data.stop == true && app.SortingInterval !== undefined) {
			let error: string | undefined;
			if (isArraySorted(app.Coordinates) === false) {
				if (typeof data.error === 'string') error = 'Error: ' + data.error;
				else error = 'Error: ' + settings.SortingAlgorithm + ' left your data unsorted.';
			}
			return suspendSorting(app, graphData, error);
		}

		data.highlight = [];
		for (let i = 0; i < speedPass; i++) [app.Coordinates, data] = sortingAlgorithm.algorithm(app.Coordinates, data);


		data.actionPoint = undefined;

		if (settings.ShowSweeper === false) data.highlight = [];

		for (let i = 0; i < data.highlight.length; i++) {
			if (app.Coordinates[data.highlight[i]] === undefined) continue;
			app.Coordinates[data.highlight[i]].highlight = true;
		}

		RenderGraph(app.Coordinates, 'regularRender', graphData);

		for (let i = 0; i < data.highlight.length; i++) {
			if (app.Coordinates[data.highlight[i]] === undefined) continue;
			delete app.Coordinates[data.highlight[i]].highlight;
		}
	}, speed);
};
