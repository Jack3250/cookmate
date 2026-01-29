import React from 'react';
import ReactApexChart from 'react-apexcharts';

/**
 * CommonChart - 재사용 가능한 ApexCharts 래퍼 컴포넌트
 * * @param {string} title - 차트 제목 (데이터 시리즈 이름)
 * @param {string} type - 차트 타입 ('bar', 'line', 'area', 'donut' 등)
 * @param {Array} categories - X축 라벨 배열 (예: ['월', '화', '수'])
 * @param {Array} data - 실제 데이터 배열 (예: [10, 20, 30])
 * @param {string} color - 차트 메인 색상 (기본값: Primary Green)
 * @param {string} height - 차트 높이
 */
const CommonChart = ({ 
  title = '데이터', 
  type = 'bar', 
  categories = [], 
  data = [], 
  color = '#03C75A',
  height = 350
}) => {
  // 현재 다크 모드인지 확인 (초기 렌더링 시점)
  const isDarkMode = document.documentElement.classList.contains('dark');

  // 차트 옵션 설정 (ApexCharts 문법)
  const options = {
    chart: {
      id: 'common-chart',
      background: 'transparent', // 배경은 부모 div를 따름
      toolbar: {
        show: true, // 다운로드 메뉴
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true 
        },
      },
      fontFamily: '"Noto Sans KR", sans-serif',
    },
    theme: {
      mode: isDarkMode ? 'dark' : 'light', // 다크 모드 테마 적용
    },
    xaxis: {
      categories: categories, // X축 라벨
      labels: {
        style: {
          colors: isDarkMode ? '#A1A1AA' : '#64748B', // 글자색 조정
          fontSize: '12px'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? '#A1A1AA' : '#64748B',
        }
      }
    },
    grid: {
      borderColor: isDarkMode ? '#3F3F46' : '#E2E8F0', // 격자선 색상
      strokeDashArray: 4, // 점선 스타일
    },
    colors: [color], // 차트 색상
    dataLabels: {
      enabled: false, // 막대 위 숫자 표시 여부
    },
    plotOptions: {
      bar: {
        borderRadius: 4, // 막대 둥글게
        columnWidth: '50%',
      }
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light', // 툴팁 다크모드
    }
  };

  // 차트 데이터 시리즈
  const series = [{
    name: title,
    data: data
  }];

  return (
    <div className="w-full bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark p-4">
      {/* 차트 헤더 */}
      <div className="mb-4 px-2">
        <h3 className="font-bold text-gray-800 dark:text-gray-100">{title} 현황</h3>
      </div>
      
      {/* 실제 차트 렌더링 */}
      <ReactApexChart
        options={options} 
        series={series} 
        type={type} 
        height={height} 
      />
    </div>
  );
};

export default CommonChart;