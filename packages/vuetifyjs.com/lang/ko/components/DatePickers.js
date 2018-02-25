export default {
  header: '날짜 선택기 (Date/month picker)',
  headerText: '`v-date-picker`는 여러 다른 Vuetify 컴포넌트에서 쓰일 수 있는 독립적 컴포넌트입니다.\n 이 컴포넌트는 날짜/월을 선택할 수 있는 시각적 표현을 제공합니다.',
  components: ['v-date-picker'],
  examples: [{
    dateLight: {
      header: 'Date pickers',
      desc: 'Date picker 는 세로(portrait) 와 가로(landscape0) 두 방향의 변형이 있습니다. 기본 모드는 세로입니다. 기본적으로 날(날짜 선택기의 경우)이나 월(월 선택기의 경우) `input` 이벤트가 emit 됩니다. 하지만 **reactive** prop을 사용하면 year/month 를 클릭했을 때도 모델을 업데이트할 수 있습니다.'
    },
    dateColorable: {
      header: 'Date pickers - 색상 (Colors)',
      desc: '날짜 선택기의 색은 `color` 와 `head-color` prop으로 설정할 수 있습니다. `if-header-color` prop이 없으면 `color` prop의 값이 사용됩니다.'
    },
    dateDialogAndMenu: {
      header: 'Date pickers - 대화창과 메뉴에서 사용하기 (In dialog and menu)',
      desc: '선택기를 `v-text-field` 에 결합 하려면, **readonly** prop을 사용하는 것을 권장합니다. 이는 모바일 키보드가 작동하는 것을 방지합니다. 세로 공간을 절약하려면 선택기의 제목을 숨길수 있습니다.  \n\n  선택기(Pickers)는 저장(save), 취소(cancel) 기능을 가로챌 수 있는(hook) 스코프드 슬롯(socped slot)을 제공합니다.  This will maintain an old value which can be replaced if the user cancels.'
    },
    dateAllowedDates: {
      header: 'Date pickers - 특정 날짜 허용 (Allowed dates)',
      desc: '배열, 오브젝트, 함수를 이용하여 선택 가능한 날짜를 정할 수 있습니다.'
    },
    dateWidth: {
      header: 'Date pickers - 너비 조절 (Setting picker width)',
      desc: '선택기의 너비를 조절하거나 꽉 차게 만들 수 있습니다.'
    },
    dateBirthday: {
      header: 'Date pickers - 생년월일 선택기 (birthday picker)',
      desc: '기본적으로 년도를 먼저 선택하고, 월/일로 줄여나간 후 날짜를 선택하면 종료되는 방법으로 완벽한 생년월일 선택기를 만들 수 있습니다.'
    },
    datePickerDate: {
      header: 'Date pickers - react to disaplyed month/year change',
      desc: 'You can watch the `pickerDate` which is the displayed month/year (depending on the picker type and active view) to perform some action when it changes.'
    },
    dateEvents: {
      header: 'Date pickers - 이벤트 (Events)',
      desc: '배열, 오브젝트, 함수를 사용해서 이벤트를 지정할 수 있습니다. 기본 색깔을 바꾸려면 **event-color** prop을 사용합니다.'
    },
    dateInternationalization: {
      header: 'Date pickers - 국제화 (Internationalization)',
      desc: '자바스크립트의 Date 오브젝트를 통해 국제화를 지원합니다. `locale` prop에 BCP 47 언어 태그를 지정하고 `first-day-of-week` prop으로 한 주의 시작 요일을 설정하세요.'
    },
    dateIcons: {
      header: 'Date pickers - 아이콘 (icons)',
      desc: '선택기에서 사용하는 아이콘을 바꿀 수 있습니다.'
    },
    dateReadonly: {
      header: 'Date pickers - 읽기전용 (read only)',
      desc: '**readonly** prop은 날짜 선택을 비활성화 합니다.'
    },
    dateCurrent: {
      header: 'Date pickers - 오늘 날짜 표시 (current date indicator)',
      desc: '기본적으로 오늘 날짜는 테두리형 버튼(outline button)으로 표시됩니다. **show-current** prop은 테두리(border)를 제거하거나 다른 날짜를 오늘 날짜처럼 보이게 만들 수 있습니다.'
    },
    monthLight: {
      header: '월 선택기 (Month pickers)',
      desc: 'Month pickers 는 세로(portrait) 와 가로(landscape0) 두 방향의 변형이 있습니다. 기본 모드는 세로입니다.'
    },
    monthColorable: {
      header: 'Month pickers - 색상 (Colors)',
      desc: 'Month picker의 색은 `color` 와 `head-color` prop으로 설정할 수 있습니다. `if-header-color` prop이 없으면 `color` prop의 값이 사용됩니다.'
    },
    monthDialogAndMenu: {
      header: 'Month pickers - 대화창과 메뉴에서 사용하기 (In dialog and menu)',
      desc: '선택기를 `v-text-field` 에 결합 하려면, **readonly** prop을 사용하는 것을 권장합니다. 이는 모바일 키보드가 작동하는 것을 방지합니다. 세로 공간을 절약하려면 선택기의 제목을 숨길수 있습니다.  \n\n  선택기(Pickers)는 저장(save), 취소(cancel) 기능을 가로챌 수 있는(hook) 스코프드 슬롯(socped slot)을 제공합니다.  This will maintain an old value which can be replaced if the user cancels.'
    },
    monthAllowedMonths: {
      header: 'Month pickers - 특정 달 허용 (Allowed dates)',
      desc: '배열, 오브젝트, 함수를 이용하여 선택 가능한 달를 정할 수 있습니다.'
    },
    monthWidth: {
      header: 'Month pickers - 너비 조절 (Setting picker width)',
      desc: '선택기의 너비를 조절하거나 꽉 차게 만들 수 있습니다.'
    },
    monthInternationalization: {
      header: 'Month pickers - 국제화 (Internationalization)',
      desc: '자바스크립트의 Date 오브젝트를 통해 국제화를 지원합니다. `locale` prop에 BCP 47 언어 태그를 지정하고 `first-day-of-week` prop으로 한 주의 시작 요일을 설정하세요.'
    },
    monthIcons: {
      header: 'Month pickers - 아이콘 (icons)',
      desc: '선택기에서 사용하는 아이콘을 바꿀 수 있습니다.'
    },
    monthReadonly: {
      header: 'Month pickers - 읽기전용 (read only)',
      desc: '**readonly** prop은 날짜 선택을 비활성화 합니다.'
    },
    monthCurrent: {
      header: 'Month pickers - 현재 월 표시 (current month indicator)',
      desc: '기본적으로 이번 달은 테두리형 버튼(outline button)으로 표시됩니다. **show-current** prop은 테두리(border)를 제거하거나 다른 달를 현재 월처럼 보이게 만들 수 있습니다.'
    }
  }],
  props: {
    'v-date-picker': {
      type: '선택기의 타입을 결정 - `date`는 날짜 선택, `month`는 월 선택',
      monthFormat: '월 테이블에서 월을 표시하는 포맷팅 함수. `date` (ISO 8601 문자열)과 locale (문자열) 인자와 함께 호출.',
      allowedDates: '선택가능한 날짜를 제한',
      eventColor: '이벤트를 표시하는 점의 색깔. 값은 문자열(모든 이벤트가 같은 색이 됨)이나 `오브젝트` (속성이 이벤트 날짜, 값이 그 날짜의 색깔) 또는 함수(날짜를 인자로 받아서 색깔을 반환)이 가능.',
      events: '날짜를 이벤트로 표시(날짜 선택기만 가능)',
      locale: '로케일(locale) 설정. BCP 47 language tag 문자열.',
      firstDayOfWeek: 'Sets the first day of the week, starting with 0 for Sunday.',
      titleDateFormat: '선택기 타이틀의 날짜 형식을 조절하는 함수. 인자: date (ISO 8601 문자열), locale (문자열)',
      headerDateFormat: '달력 헤더의 월 형식을  조절하는 함수. 인자: date (ISO 8601 문자열), locale (문자열)',
      yearFormat: '달력 헤더의 년 형식을  조절하는 함수. 인자: date (ISO 8601 문자열), locale (문자열)',
      dayFormat: '달력 헤더의 일 형식을  조절하는 함수. 인자: date (ISO 8601 문자열), locale (문자열)',
      yearIcon: '년 다음에 나오는 아이콘',
      min: '최소 날짜/월',
      max: '최대 날짜/월',
      pickerDate: '표시되는 년/월',
      nextIcon: '다음 달/년 버튼의 아이콘',
      prevIcon: '이전 달/년 버튼의 아이콘',
      readonly: '읽기전용으로 만듬 (새로운 날짜를 선택하거나 다른 년/월로 이동할 수 없음)',
      scrollable: '마우스 스크롤로 월을 바꿈.',
      showCurrent: '현재 날짜/월이나 현재 날짜/월로 지정된 날짜/월이 outline으로 표시될지 결정'
    }
  }
}
