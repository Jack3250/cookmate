import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectMenuList } from "../../api/menuApi";
import useCodeStore from "../../stores/useCodeStore";

/**
 * DB 메뉴 데이터 기반 동적 네비게이션 메뉴 컴포넌트 (자립형)
 */
function NavigationMenu() {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 공통코드 스토어 바인딩
  const fetchCodes = useCodeStore((state) => state.fetchCodes);
  const getCodeList = useCodeStore((state) => state.getCodeList);

  /**
   * 백엔드로부터 전체 메뉴 목록 및 공통코드 로딩
   */
  const loadMenus = async () => {
    try {
      setLoading(true);
      // 메뉴 그룹코드 및 메뉴 목록 로딩
      const [_, menuData] = await Promise.all([
        fetchCodes("MENU_GRP_CD"),
        selectMenuList(),
      ]);
      setMenuList(menuData || []);
    } catch (error) {
      console.error("메뉴 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  // 메뉴 그룹 공통코드 목록
  const menuGroupCodes = getCodeList("MENU_GRP_CD");

  // DB에서 가져온 메뉴들을 MENU_GRP_CD 기준으로 그룹화
  const groupedMenus = menuGroupCodes
    .map((groupCode) => {
      const items = menuList.filter((menu) => menu.menuGrpCd === groupCode.cd);
      return {
        grpCd: groupCode.cd,
        grpNm: groupCode.cdNm,
        items: items,
      };
    })
    .filter((group) => group.items.length > 0); // 메뉴 항목이 존재하는 그룹만 노출

  return (
    <nav className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg py-2 shadow-sm">
      {loading ? (
        <div className="p-4 text-center text-xs text-gray-400">
          메뉴를 불러오는 중...
        </div>
      ) : (
        groupedMenus.map((group, groupIdx) => (
          <React.Fragment key={group.grpCd}>
            {/* 메뉴 그룹 타이틀 헤더 */}
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              {group.grpNm}
            </div>

            {/* 하위 메뉴 항목 리스트 */}
            <ul className="text-sm">
              {group.items.map((item) => {
                // URL이 없거나 '#'인 준비 중(더미) 메뉴 여부 판별
                const isDummy = !item.menuUrl || item.menuUrl === "#";
                return (
                  <li key={item.menuId}>
                    {isDummy ? (
                      <a
                        className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
                        href={item.menuUrl || "#"}
                      >
                        {item.iconNm && (
                          <span className="material-icons text-sm mr-2 text-secondary">
                            {item.iconNm}
                          </span>
                        )}
                        {item.menuNm}
                      </a>
                    ) : (
                      <Link
                        className="flex items-center px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-l-2 border-transparent hover:border-primary transition-all"
                        to={item.menuUrl}
                      >
                        {item.iconNm && (
                          <span className="material-icons text-sm mr-2 text-secondary">
                            {item.iconNm}
                          </span>
                        )}
                        {item.menuNm}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* 메뉴 그룹 구분선 */}
            {groupIdx < groupedMenus.length - 1 && (
              <div className="border-t border-border-light dark:border-border-dark my-2"></div>
            )}
          </React.Fragment>
        ))
      )}
    </nav>
  );
}

export default NavigationMenu;
