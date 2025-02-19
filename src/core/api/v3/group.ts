import Api, { buildQuery } from '../index';

function ApiRequest(action: string, query?: string, expectEmpty = false) {
  return Api.call({ action: `/v3/Group/${action}`, expectEmpty, ...query && { query } });
}

export function getRecreateAllGroups() {
  return ApiRequest('RecreateAllGroups', '', true);
}

export function getAllGroups(page: number = 1, pageSize: number = 50, topLevelOnly: boolean = true) {
  const params = { page, pageSize, topLevelOnly };
  return ApiRequest('', buildQuery(params));
}

export function getGroupSeries(groupId: number) {
  return ApiRequest(`${groupId}/Series`);
}

export default {
  getRecreateAllGroups,
  getAllGroups,
  getGroupSeries,
};
