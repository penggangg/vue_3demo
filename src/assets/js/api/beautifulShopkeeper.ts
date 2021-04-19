import fetch from '../http';
/**
 * @interface HomepageParams -获取配置信息
 * @property openid -openid
 * @property activityId - 活动id
 */
interface HomepageParams {
    openid: string;
    activityId?: string | number;
}

/**
 * @interface CandidateListParams -获取参与人员列表
 * @property areaCode - 区域code
 * @property activityId - 活动id
 * @property queryParam - 搜索关键字
 */
 interface CandidateListParams {
    areaCode: string;
    activityId?: string | number;
    queryParam: string;
    pageNo: number;
    pageSize: number;
}

/**
 * @interface VoteParams
 * @property areaCode - 区域code
 * @property activityId - 活动id
 * @property userCode - 投给用户的code
 * @property uniqueCode - 唯一标识 （时间戳）
 */
interface VoteParams {
    openid: string;
    areaCode: string;
    userCode: string;
    uniqueCode: number;
    activityId?: number;
}
export const homepageParams = (params: HomepageParams) => fetch(`/api-srvote/api/vote/security/300101/${params.activityId ? 'v2' : 'v1'}/homepageParams`, params, 'POST', { withMask: false });

export const queryCandidateList = (params: CandidateListParams) => fetch(`/api-srvote/api/vote/security/300102/${params.activityId ? 'v2' : 'v1'}/queryCandidateList`, params);

export const vote = (params: VoteParams) => fetch(`/api-srvote/api/vote/security/300103/${params.activityId ? 'v2' : 'v1'}/vote`, params);
