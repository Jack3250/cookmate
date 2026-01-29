import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const AddressSearch = ({ onComplete, onClose }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const darkTheme = {
    bgColor: "#162525", //바탕 배경색
    searchBgColor: "#162525", //검색창 배경색
    contentBgColor: "#162525", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: "#162525", //페이지 배경색
    textColor: "#FFFFFF", //기본 글자색
    queryTextColor: "#FFFFFF", //검색창 글자색
    outlineColor: "#444444" //테두리
  };

  const handleComplete = (data) => {
    console.log("주소 결과 반환 : ", data);
    // 전체 주소
    let fullAddress = data.address;

    // 추가 주소
    let extraAddress = '';

    if (data.addressType === 'R') { // 도로명 주소 경우
      if (data.bname !== '') {
        // 법정동, 법정리
        extraAddress += data.bname;
      }

      if (data.buildingName !== '') {
        // 건물명
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      
      // 결과 : 서울 강남구 테헤란로 123 (역삼동, OO빌딩)
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    onComplete({
      address: fullAddress,
      zonecode: data.zonecode
    });

    onClose();
  };

  /**
   * 부모창에서 호출 방법
   * 
   * 모달 열림 상태관리
   * const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
   * 
   * 주소 검색 완료 핸들러
   * const handleAddressComplete = (data) => {
   * setFormData(prev => ({
   *   ...prev,
   *   zipcode: data.zonecode,
   *   address: data.address
   *   }));
   *   setIsAddressModalOpen(false);
   * };
   * 
   * 버튼 선언
   * <button type="button" onClick={() => setIsAddressModalOpen(true)}
   *    className="px-4 py-2 bg-secondary hover:bg-orange-600 text-white rounded text-sm font-bold transition-colors">
   * 
   * 모달 선언
   * {isAddressModalOpen && (<AddressSearch onClose={() => setIsAddressModalOpen(false)} onComplete={handleAddressComplete} />)}
   */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-surface-dark rounded-lg shadow-xl overflow-hidden border border-border-light dark:border-border-dark">
        <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark">
          <h3 className="font-bold text-gray-800 dark:text-gray-200">주소 검색</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="h-[450px]">
          <DaumPostcode
            onComplete={handleComplete}
            style={{ width: '100%', height: '100%' }}
            theme={isDarkMode ? darkTheme : null}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSearch;