import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Quick Sort';
export const description = 'Quick Sort compares all elements of a list to a pivot, larger values appear on one side, smaller values appear on the other side. Quick Sort continuously keeps selecting pivots until it could guarantee all points are sorted.';
export const example = 'When moving into a new house, you place every kitchen item in the kitchen and everything else is placed in the living room. You then seperate all kitchen items into refrigerated items and normal items. You keep seperating items until everything has been individually placed correctly.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	if (Array.isArray(data.nests) && data.nests.length === 0) {
		data.stop = true;
		return [arr, data];
	}

	if (!data.nests) data.nests = [[0, arr.length - 1]];
	const currentNest: [number, number] = data.nests[0];

	// 原：if (currentNest.length > 1) {
	if (currentNest[0] < currentNest[1]) {
		const middle = Math.floor((currentNest[0] + currentNest[1]) / 2);

		if (data.leftPoint === undefined) data.leftPoint = currentNest[0];
		if (data.rightPoint === undefined) data.rightPoint = currentNest[1];
		if (data.pivot === undefined) data.pivot = arr[middle];

		// 原：data.highlight.push(middle);
		data.highlight.push(arr.indexOf(data.pivot));

		// 原：if (data.leftPoint < data.rightPoint + 1) {
		// C 的一次循环内，两侧扫描都完成后才判断是否交换。
		if (data.leftPoint <= data.rightPoint || data.scanning) {
			data.scanning = true;
			if (arr[data.leftPoint].data < data.pivot.data) {
				data.actionPoint = arr[data.leftPoint];
				data.highlight.push(data.leftPoint);
				data.leftPoint++;
			}
			else if (arr[data.rightPoint].data > data.pivot.data) {
				data.actionPoint = arr[data.rightPoint];
				data.highlight.push(data.rightPoint);
				data.rightPoint--;
			}
			else {
				data.scanning = false;
				data.actionPoint = data.pivot;

				if(data.leftPoint <= data.rightPoint) {
					[arr[data.leftPoint], arr[data.rightPoint]] = [arr[data.rightPoint], arr[data.leftPoint]];
					data.highlight.push(data.leftPoint, data.rightPoint);
					data.leftPoint++;
					data.rightPoint--;
					// 原：data.highlight.push(data.leftPoint, data.rightPoint);
				}
				else {
					data.actionPoint = data.pivot;
				}
			}
		}
		else {
			/* 原：队列按层处理，左区间结束于 leftPoint - 1。
			if (currentNest[0] < data.leftPoint - 1) {
				data.nests.push([currentNest[0], data.leftPoint - 1]);
			}
			if (data.leftPoint < currentNest[1]) {
				data.nests.push([data.leftPoint, currentNest[1]]);
			}
			data.nests.shift();
			*/
			// 先移除当前区间，再依次前插右、左区间，模拟 C 的左侧优先递归。
			data.nests.shift();
			if (data.leftPoint < currentNest[1]) {
				data.nests.unshift([data.leftPoint, currentNest[1]]);
			}
			if (currentNest[0] < data.rightPoint) {
				data.nests.unshift([currentNest[0], data.rightPoint]);
			}

			data.leftPoint = undefined;
			data.rightPoint = undefined;
			data.pivot = undefined;
		}
	}
	else {
		data.nests.shift();
	}

	return [arr, data];
};
