import { create } from 'zustand';
import { selectCmmnCodeList } from '../api/commonApi';

/**
 * 공통코드 데이터 전역 캐싱 및 매핑 스토어
 */
const useCodeStore = create((set, get) => ({
  // 상태 관리
  codes: {},

  /**
   * 백엔드 API로부터 특정 그룹의 공통코드를 비동기 로드하여 스토어에 보관하는 함수
   * @param {String} grpCd 그룹 코드
   */
  fetchCodes: async (grpCd) => {
    const currentCodes = get().codes[grpCd];

    // 이미 캐시된 데이터가 있는 경우 중복 API 호출을 방지
    if (currentCodes && currentCodes.length > 0) {
      return currentCodes;
    }

    try {
      const data = await selectCmmnCodeList(grpCd);
      set((state) => ({
        codes: {
          ...state.codes,
          [grpCd]: data || []
        }
      }));
      return data;
    } catch (error) {
      console.error(`공통코드 ${grpCd} 로드 실패:`, error);
      return [];
    }
  },

  /**
   * 지정된 그룹코드와 상세코드를 기반으로 코드명(한글명)을 반환하는 헬퍼 함수
   * @param {String} grpCd 그룹 코드 (예: CATEGORY_CD)
   * @param {String} cd 상세 코드 (예: 01)
   * @returns {String} 코드 명칭 (예: 한식)
   */
  getCodeName: (grpCd, cd) => {
    const list = get().codes[grpCd];
    if (!list || list.length === 0) {
      return cd; // 아직 로드가 안 된 경우 코드를 임시로 반환
    }
    const item = list.find((i) => i.cd === cd);
    return item ? item.cdNm : cd;
  },

  /**
   * 스토어에 보관된 특정 그룹의 상세코드 전체 목록을 반환하는 함수 (셀렉트 박스 바인딩용)
   * @param {String} grpCd 그룹 코드
   * @returns {Array} 상세코드 목록
   */
  getCodeList: (grpCd) => {
    return get().codes[grpCd] || [];
  }
}));

export default useCodeStore;
