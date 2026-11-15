import { Component, Input } from '@angular/core';
import { graphColors, graphTypes, sampleOrders, sampleTypes, settings } from '../../settings';
import { SetCookie } from '../../shared/cookies';
import { IDataPoint } from '../../shared/interfaces';
import { RenderGraph } from '../../shared/renderGraph';

@Component({
	selector: 'component-submenu',
	templateUrl: './submenu.component.html',
})
export class submenuComponent {
	@Input() Coordinates: IDataPoint[] | undefined;

	SetSpeed(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SortSpeed', object.toString());
		}
		if (object >= 3) object = Math.round(Math.pow(2, object));
		else object = Math.round(Math.pow(2, object) * 10) / 10;

		const textElement = document.getElementById('SortSpeedText');
		if (textElement instanceof HTMLElement) textElement.innerText = '排序间隔：' + object + ' ms';
		settings.SortSpeed = object;
	}

	SetSample(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SampleSize', object.toString());
		}
		const val = Math.round(Math.pow(2, object));

		const textElement = document.getElementById('SampleSizeText');
		if (textElement instanceof HTMLElement) textElement.innerText = '样本数量：' + val;
		settings.SampleSize = val;
	}

	SetGraphType(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('GraphType', object.toString());
		}
		const index = Math.round(object);
		const val = graphTypes[index]?.name;
		settings.GraphType = val;

		const graphTypeNames = [
			'柱状图',
			'饼图',
			'散点图',
			'历史轨迹图',
			'折线图'
		];

		const textElement = document.getElementById('GraphTypeText');
		if (textElement instanceof HTMLElement)
			textElement.innerText = '图表类型：' + graphTypeNames[index];
				RenderGraph(this.Coordinates, 'mustRender');
		}

	SetGraphColor(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('GraphColor', object.toString());
		}
		const index = Math.round(object);
		const val = graphColors[index]?.name;
		settings.GraphColor = val;

		const data: Array<IDataPoint & { index?: number }> | undefined = this.Coordinates;
		if (data === undefined) return;
		const dataLength = data.length;

		for (let i = 0; i < dataLength; i++) {
			data[i].index = i;
		}

		data.sort((a, b) => a.id - b.id);

		for (let i = 0; i < dataLength; i++) {
			data[i].color = graphColors[index].color(dataLength, i, data[i].index ?? i);
		}

		data.sort((a, b) => {
			if (a.index !== undefined && b.index !== undefined) return a.index - b.index;
			return 0;
		});

		RenderGraph(this.Coordinates, 'mustRender');

		const graphColorNames = [
			'灰度',
			'单色',
			'彩虹色',
			'反向彩虹色'
		];

		const textElement = document.getElementById('GraphColorText');
		if (textElement instanceof HTMLElement)
			textElement.innerText = '图表颜色：' + graphColorNames[index];
	}

	SetShowSweeper(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('ShowSweeper', object.toString());
		}
		const val = Boolean(object);
		settings.ShowSweeper = val;

		const textElement = document.getElementById('ShowSweeperText');
		if (textElement instanceof HTMLElement)
			textElement.innerText = '显示扫描线：' + (val ? '开启' : '关闭');
	}

	SetSampleType(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SampleType', object.toString());
		}
		const val = sampleTypes[Math.round(object)].name;
		settings.SampleType = val;

		const sampleTypeNames = [
			'分段常量型',
			'指数型',
			'线性型',
			'对数型',
			'随机型'
		];

		const textElement = document.getElementById('SampleTypeText');
		if (textElement instanceof HTMLElement)
			textElement.innerText = '数据类型：' + sampleTypeNames[Math.round(object)];
	}

	SetSampleOrder(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SampleOrder', object.toString());
		}
		const val = sampleOrders[Math.round(object)].name;
		settings.SampleOrder = val;

		const sampleOrderNames = ['逆序', '随机'];

		const textElement = document.getElementById('SampleOrderText');
		if (textElement instanceof HTMLElement)
			textElement.innerText = '数据顺序：' + sampleOrderNames[Math.round(object)];
	}

}
