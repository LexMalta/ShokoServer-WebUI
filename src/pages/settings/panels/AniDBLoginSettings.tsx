import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mdiLoading, mdiContentSave } from '@mdi/js';
import { Icon } from '@mdi/react';

import { RootState } from '../../../core/store';
import Events from '../../../core/events';
import FixedPanel from '../../../components/Panels/FixedPanel';
import InputSmall from '../../../components/Input/InputSmall';
import Button from '../../../components/Input/Button';

function AniDBLoginSettings() {
  const dispatch = useDispatch();

  const aniDBSettings = useSelector((state: RootState) => state.localSettings.AniDb);
  const isFetching = useSelector((state: RootState) => state.fetching.settings);
  const isTesting = useSelector((state: RootState) => state.fetching.aniDBTest);

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [ClientPort, setClientPort] = useState(4556);
  const [AVDumpKey, setAVDumpKey] = useState('');
  const [AVDumpClientPort, setAVDumpClientPort] = useState(4557);

  useEffect(() => {
    setUsername(aniDBSettings.Username);
    setPassword(aniDBSettings.Password);
    setClientPort(aniDBSettings.ClientPort);
    setAVDumpKey(aniDBSettings.AVDumpKey);
    setAVDumpClientPort(aniDBSettings.AVDumpClientPort);
  }, []);

  const testAndSave = (payload = {
    Username, Password, ClientPort, AVDumpKey, AVDumpClientPort,
  }) => dispatch({ type: Events.SETTINGS_ANIDB_TEST, payload });

  const renderOptions = () => (
    <div className="flex">
      <Button onClick={() => testAndSave()} tooltip="Test and Save">
        <Icon className="text-highlight-1" path={isTesting ? mdiLoading : mdiContentSave} spin={isTesting} size={1} />
      </Button>
    </div>
  );

  return (
    <FixedPanel title="AniDB Login" options={renderOptions()} isFetching={isFetching}>
      <div className="flex justify-between mt-1">
        Username
        <InputSmall id="Username" value={Username} type="text" onChange={e => setUsername(e.target.value)} className="w-32 px-2 py-0.5" />
      </div>
      <div className="flex justify-between mt-1">
        Password
        <InputSmall id="Password" value={Password} type="password" onChange={e => setPassword(e.target.value)} className="w-32 px-2 py-0.5" />
      </div>
      <div className="flex justify-between mt-1">
        Port
        <InputSmall id="ClientPort" value={ClientPort} type="number" onChange={e => setClientPort(e.target.value)} className="w-32 px-2 py-0.5" />
      </div>
      <div className="flex justify-between mt-1">
        AvDump Key
        <InputSmall id="AVDumpKey" value={AVDumpKey} type="password" onChange={e => setAVDumpKey(e.target.value)} className="w-32 px-2 py-0.5" />
      </div>
      <div className="flex justify-between mt-1">
        AvDump Port
        <InputSmall id="AVDumpClientPort" value={AVDumpClientPort} type="number" onChange={e => setAVDumpClientPort(e.target.value)} className="w-32 px-2 py-0.5" />
      </div>
    </FixedPanel>
  );
}

export default AniDBLoginSettings;
