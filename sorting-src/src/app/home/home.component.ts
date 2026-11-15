import { Component } from '@angular/core';
import { GetCookie } from '../../shared/cookies';
import { IDataPoint } from '../../shared/interfaces';
import { sortGraph } from '../../shared/sortGraph';
import { RenderGraph } from '../../shared/renderGraph';
import { defaultSettings, settings, sortingAlgorithms } from '../../settings';

@Component({
	selector: 'home-page',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	SortingAlgorithm = settings.SortingAlgorithm;

	SortingInterval: number | undefined;
	ErrorMessage: string | undefined;
	Coordinates: IDataPoint[] | undefined;
	SortingSettingsMenu = false;

	ngOnDestroy() {
		if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);
	}

	ngOnInit() {
		this.onResize();

		const setInput = (setting: string, fallback: number, forceDefault = false) => {
			const cookie = setting === 'SampleSize' || forceDefault ? fallback : (GetCookie(setting) ?? fallback);
			(<HTMLInputElement>document.getElementById(setting)).setAttribute('value', cookie.toString());
			(<HTMLInputElement>document.getElementById(setting)).dispatchEvent(new Event('input'));
		};

		const iframeSrc = window.frameElement?.getAttribute('src');
		const url = new URL(iframeSrc || window.location.href, window.location.href);
		const requestedAlgorithm = url.searchParams.get('algorithm');
		const savedAlgorithm = GetCookie('SortingAlgorithm');

		const algorithm = [requestedAlgorithm, savedAlgorithm, 'Quick Sort']
			.find(name => sortingAlgorithms.some(a => a.name === name));

		settings.SortingAlgorithm = algorithm ?? 'Quick Sort';
		this.SortingAlgorithm = settings.SortingAlgorithm;
		const useFourMs = ['Quick Sort', 'Heap Sort', 'Merge Sort'].includes(settings.SortingAlgorithm);
		setInput('SortSpeed', useFourMs ? 2 : defaultSettings.SortSpeed, useFourMs);
		setInput('SampleSize', ['Bubble Sort', 'Selection Sort', 'Insertion Sort'].includes(settings.SortingAlgorithm) ? 6 : 8);
		setInput('GraphType', defaultSettings.GraphType);
		setInput('GraphColor', defaultSettings.GraphColor);
		setInput('SampleType', defaultSettings.SampleType);
		setInput('SampleOrder', defaultSettings.SampleOrder);
		setInput('ShowSweeper', defaultSettings.ShowSweeper);

		sortGraph(this);
		const canvas = document.getElementById('DataGraph');
		if (canvas) {
			const timer = window.setInterval(() => {
				const containerWidth =
					canvas.parentElement?.getBoundingClientRect().width ?? 0;

				if (window.innerWidth > 0 && containerWidth > 0) {
					window.clearInterval(timer);

					this.onResize();
					this.ResetGraph();
				}
			}, 150);
		}
	}

	onResize() {
		const graph = <HTMLCanvasElement>document.getElementById('DataGraph');
		if (graph === null) return;
		if (window.innerWidth > 820) {
			let windowWidth = window.innerWidth;
			if (windowWidth > 1200) windowWidth = 1200;
			const width = Math.round(50 + (windowWidth * 0.37)) + 'px';
			if (graph.style.width === width) return;
			graph.style.width = width;
			graph.width = parseFloat(width);
			RenderGraph(this.Coordinates, 'mustRender');
		}
		else {
			graph.width = window.innerWidth * 0.8;
			RenderGraph(this.Coordinates, 'mustRender');
			if (graph.style.width === '80%') return;
			graph.style.width = '80%';
		}
	}

	ResetGraph = () => {
		if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);

		sortGraph(this);
	};
}
