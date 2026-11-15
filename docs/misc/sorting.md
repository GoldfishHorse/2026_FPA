
# 排序算法可视化

通过交互动画观察不同排序算法的执行过程。

冒泡、选择、插入默认各 64 个样本，快速、归并和堆排序默认各 256 个样本。

=== "冒泡排序"

    冒泡排序（Bubble Sort）通过反复比较相邻元素，
    将较大的元素逐步移动到数组末端。

    <iframe src="../sorting-app/?algorithm=Bubble%20Sort" width="100%" height="1000" style="border:0;display:block;" scrolling="no"></iframe>

    ```c
    void bubble_sort(int a[], int n)
    {
        for (int end = n - 1; end > 0; --end) {
            int changed = 0;
            for (int j = 0; j < end; ++j) {
                if (a[j] > a[j + 1]) {
                    int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                    changed = 1;
                }
            }
            if (!changed) break;
        }
    }
    ```


=== "选择排序"

    选择排序（Selection Sort）每轮从未排序部分选出
    最小元素，并放置到对应位置。

    <iframe src="../sorting-app/?algorithm=Selection%20Sort" width="100%" height="1000" style="border:0;display:block;" scrolling="no"></iframe>

    ```c
    void selection_sort(int a[], int n)
    {
        for (int i = 0; i < n - 1; ++i) {
            int min_index = i;
            for (int j = i + 1; j < n; ++j)
                if (a[j] < a[min_index]) min_index = j;
            int t = a[i]; a[i] = a[min_index]; a[min_index] = t;
        }
    }
    ```


=== "插入排序"

    插入排序（Insertion Sort）依次将新元素插入
    已排序部分的适当位置。

    <iframe src="../sorting-app/?algorithm=Insertion%20Sort" width="100%" height="1000" style="border:0;display:block;" scrolling="no"></iframe>

    ```c
    void insertion_sort(int a[], int n)
    {
        for (int i = 1; i < n; ++i) {
            int value = a[i], j = i;
            while (j > 0 && a[j - 1] > value) {
                a[j] = a[j - 1];
                --j;
            }
            a[j] = value;
        }
    }
    ```


=== "快速排序"

    快速排序（Quick Sort）通过选取基准元素（pivot） ，
    将数组划分为两个部分并递归排序。

    <iframe src="../sorting-app/?algorithm=Quick%20Sort" width="100%" height="1000" style="border:0;display:block;" scrolling="no"></iframe>

    ```c
    /* 快速排序：对闭区间 a[left..right] 排序，
       调用入口为  quick_sort(a, 0, n - 1) */
    void quick_sort(int a[], int left, int right)
    {
        if (left >= right) return;
        /* 选取 pivot */
        int pivot = a[left + (right - left) / 2];
        /* Hoare 划分 */
        int i = left, j = right;
        while (i <= j) {
            while (a[i] < pivot) ++i;
            while (a[j] > pivot) --j;
            if (i <= j) {
                int t = a[i]; a[i] = a[j]; a[j] = t;
                ++i;
                --j;
            }
        }
        /* 递归排序两部分 */
        if (left < j) quick_sort(a, left, j);
        if (i < right) quick_sort(a, i, right);
    }
    ```


=== "归并排序"

    归并排序（Merge Sort）将数组递归拆分，
    再通过合并有序子数组完成排序。

    <iframe src="../sorting-app/?algorithm=Merge%20Sort" width="100%" height="1000" style="border:0;display:block;" scrolling="no"></iframe>


    ```c
    /*  归并排序：对 a[left, right)  左闭右开区间排序，
        temp 为与 a 相同长度的辅助数组。
        调用入口为 merge_sort(a, temp, 0, n) */
    void merge_sort(int a[], int temp[], int left, int right)
    {
        if (right - left <= 1) return;
        int mid = left + (right - left) / 2;
         /* 递归排序左右两半 */
        merge_sort(a, temp, left, mid);
        merge_sort(a, temp, mid, right);
        /* 归并 */
        int i = left, j = mid, k = left;
        while (i < mid && j < right)
            temp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i < mid) temp[k++] = a[i++];
        while (j < right) temp[k++] = a[j++];
        for (k = left; k < right; ++k) a[k] = temp[k];
    }
    ```


=== "堆排序"

    堆排序（Heap Sort）利用堆的数据结构，
    反复取出最大元素并调整剩余元素。

    <iframe src="../sorting-app/?algorithm=Heap%20Sort" width="100%" height="1000" style="border:0;display:block;" scrolling="no"></iframe>

    ```c
    /* 向下调整：让 a[root] 在子树中下沉到合适位置，维持大顶堆性质 */
    static void sift_down(int a[], int root, int n)
    {
        while (root < n / 2) {
            int child = 2 * root + 1;
            if (child + 1 < n && a[child] < a[child + 1])
                ++child;
            if (a[root] >= a[child]) break;
            int t = a[root];
            a[root] = a[child];
            a[child] = t;
            root = child;
        }
    }

    void heap_sort(int a[], int n)
    {
        /* make heap：建大顶堆 */
        for (int root = n / 2; root > 0; --root)
            sift_down(a, root - 1, n);
        /* sort：不断取出堆顶最大值放到数组末尾 */
        for (int end = n - 1; end > 0; --end) {
            int t = a[0];
            a[0] = a[end];
            a[end] = t;
            sift_down(a, 0, end);
        }
    }
    ```

> 注：可视化动画改编自 [Kyle Smith 的 Sorting Algorithm Visualizer](https://sorting-algorithm-jet.vercel.app/)。