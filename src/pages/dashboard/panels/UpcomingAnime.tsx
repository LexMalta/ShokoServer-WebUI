import React, { useState } from 'react';
import ShokoPanel from '../../../components/Panels/ShokoPanel';
import DashboardTitleToggle from '../components/DashboardTitleToggle';
import EpisodeDetails from '../components/EpisodeDetails';

import { useGetDashboardAniDBCalendarQuery } from '../../../core/rtkQuery/dashboardApi';

const UpcomingAnime = () => {
  const [showAll, setShowAll] = useState(false);
  const items = useGetDashboardAniDBCalendarQuery({ showAll });

  return (
    <ShokoPanel isFetching={items.isFetching} title={<DashboardTitleToggle title="Upcoming Anime" mainTitle="My Collection" secondaryTitle="All" secondaryActive={showAll} setSecondaryActive={setShowAll} />}>
      <div className="flex flex-nowrap overflow-x-auto shoko-scrollbar h-90 pb-5">
        {items.data?.length === 0 && <div className="flex justify-center font-semibold mt-4">It Looks like Your Not Watching Anything Currently Airing.</div>}
        {items.data?.map(item => <EpisodeDetails episode={item} showDate key={item.IDs.ID} />)}
      </div>
    </ShokoPanel>
  );
};

export default UpcomingAnime;
