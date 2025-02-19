import React from 'react';
import { Icon } from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';

import ShokoPanel from '../../../components/Panels/ShokoPanel';
import { DashboardNewsType } from '../../../core/types/api/dashboard';

import { useGetShokoNewsFeedQuery } from '../../../core/rtkQuery/externalApi';

function ShokoNews() {
  const items = useGetShokoNewsFeedQuery();

  const renderRow = (item: DashboardNewsType) => (
    <div className="flex flex-col space-y-1 mt-1 first:mt-0" key={item.title}>
      <p className="text-base font-semibold">{item.title}</p>
      <p className="text-base font-semibold opacity-75">Posted on: {item.date_published}</p>
      <p className="text-base line-clamp-2">{item.content_text}</p>
      <div className="flex space-x-0.5 text-highlight-1 font-semibold">
        <a href={item.link} rel="noopener,noreferrer" target="_blank">Read More</a>
        <Icon path={mdiOpenInNew} size={1} />
      </div>
    </div>
  );

  return (
    <ShokoPanel title="Shoko News" isFetching={items.isLoading}>
      <div className="flex flex-col space-y-3">
        {items.data?.slice(0, 2).map(item => renderRow(item))}
      </div>
    </ShokoPanel>
  );
}

export default ShokoNews;
