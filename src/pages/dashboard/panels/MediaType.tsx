import React from 'react';
import { useSelector } from 'react-redux';
import { forEach } from 'lodash';

import ShokoPanel from '@/components/Panels/ShokoPanel';
import { useDashboardSeriesSummaryQuery } from '@/core/react-query/dashboard/queries';

import type { RootState } from '@/core/store';

const names = {
  Series: 'TV Series',
};

function MediaType() {
  const layoutEditMode = useSelector((state: RootState) => state.mainpage.layoutEditMode);
  const seriesSummary = useDashboardSeriesSummaryQuery();

  const renderColor = (type: string) => {
    switch (type) {
      case 'Series':
        return 'panel-text-primary';
      case 'Other':
        return 'panel-text-other';
      case 'Web':
        return 'panel-text-danger';
      case 'Movie':
        return 'panel-text-important';
      case 'OVA':
        return 'panel-text-warning';
      default:
        return 'panel-text-primary';
    }
  };

  const renderName = (item: string, count: number, countPercentage: number) => (
    <div key={`${item}-name`} className="mt-5 flex first:mt-0">
      <span className="grow">
        {names[item] ?? item}
        &nbsp;-&nbsp;
        {count}
      </span>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <span className={`text-${renderColor(item)} font-semibold`}>
        {countPercentage.toFixed(2)}
        %
      </span>
    </div>
  );

  const renderBar = (item: string, countPercentage: number) => (
    <div key={`${item}-bar`} className="mt-2 flex rounded-md bg-panel-input">
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className={`bg-${renderColor(item)} h-4 rounded-md`} style={{ width: `${countPercentage}%` }} />
    </div>
  );

  let total = 0;
  const seriesSummaryArray: [string, number][] = [];

  forEach(seriesSummary.data, (item, key) => {
    total += item ?? 0;
    seriesSummaryArray.push([key, item ?? 0]);
  });

  seriesSummaryArray.sort((a, b) => (a[1] < b[1] ? 1 : -1));

  const items: React.ReactNode[] = [];

  forEach(seriesSummaryArray, (item) => {
    let countPercentage = 0;
    if (total) {
      countPercentage = (item[1] / total) * 100;
    }
    items.push(renderName(item[0], item[1], countPercentage));
    items.push(renderBar(item[0], countPercentage));
  });

  return (
    <ShokoPanel title="Media Type" isFetching={seriesSummary.isPending} editMode={layoutEditMode}>
      {items}
    </ShokoPanel>
  );
}

export default MediaType;
