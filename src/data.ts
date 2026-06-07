/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character, ClassTier, TimelineEvent, LocationIndex } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: "claude",
    name: "Claude Heron",
    symbol: "Swan 🦢",
    meta: "27세 · 전무이사 · Heron Group",
    age: "27",
    height: "192 cm",
    appearance: {
      hair: "백금발 (오후 햇살에 거의 흰색으로 비치는 차가운 색조)",
      eyes: "짙은 남벽안 (속내를 파악하기 힘들 만큼 깊고 고요함)",
      clothes: "새빌 로우 맞춤 스리피스 다크 차콜 슈트 (흐트러짐 없음)",
      notable: "손목의 은색 테두리 오메가 빈티지 시계, 침묵의 거리감"
    },
    surface: "언제나 정중하고 흠잡을 곳 없는 태도로 타인과의 거리를 무섭도록 철저하게 유지한다. 감정이 격해질수록 오히려 목소리가 극단적으로 낮고 나직해지며, 대화 중 발생하는 정적과 침묵을 가장 효과적인 교섭 카드로 활용한다.",
    hiddenInner: "어머니 Eleanor의 죽음과 아버지 리처드의 혹독하고 차가운 지배 하에 자라 타인을 진심으로 신뢰하는 힘을 거부한다. 9년 전 작별 인사도 없이 돌연 런던을 떠난 것은, 랭글리의 몰락과 자신의 깊은 속내가 얽혀 발생한 일이었다. 그의 마음속 한편에는 랭글리에 대한 결코 꺼지지 않는 무거운 부채감이 조용히 흐르고 있다.",
    quote: "“침묵은 소리의 부재가 아니야. 가장 정밀한 계산 끝에 지불하는 대가지, 랭글리.”",
    tags: ["침묵 = 강함", "완벽한 거리", "심연의 9년", "숨겨진 속죄"],
    relationships: [
      { target: "User (Langley)", text: "“내가 세브노크스를 떠난 그 여름날 계단에 남겨진 아이. 9년 만에 다시 만났을 때, 너는 여전히 랭글리의 상흔을 입은 채 나를 겨누고 있더군. 이번 재회가 복수이기를 바란다.”" },
      { target: "Julian Heron", text: "“네 소셜 스캔들과 가벼운 농담에 장단 맞춰줄 자비는 내게 없다. 이사회에서 너른 자리를 얻었다고 해서 네가 진짜 헤론이 되는 것은 아니지.”" },
      { target: "Richard Heron", text: "“그는 피할 수 없는 철옹성이다. 하지만 내가 세브노크스의 비밀 지하에서 그가 저지른 가문 참사의 장부를 확인한 순간, 이미 우리의 계약은 깨졌다.”" }
    ],
    album: [
      {
        id: "claude_1",
        title: "세브노크스 계단의 첫 정적",
        date: "2007 · Summer",
        subtitle: "The First Silence in Sevenoaks",
        desc: "클로드가 여덟 살이던 여름날. 대저택 붉은 계단 위에 서서, 세바스찬 랭글리의 등 뒤에 숨은 가난한 어린 유저를 차갑고 무표정하게 내려다보던 순간입니다. 햇살이 소년의 백금발에 닿아 투명하게 흩어졌고 신생 가문과 몰락할 가문의 첫 격차가 조용히 벌어졌습니다.",
        image: "https://picsum.photos/seed/claude_1/600/400"
      },
      {
        id: "claude_2",
        title: "아이리스의 장례식, 빗속의 소년",
        date: "2014 · 04.17",
        subtitle: "The Boy in the Rain of Iris's Funeral",
        desc: "유저의 어머니 아이리스의 교통사고 사망 당일. 세브노크스 정원 외곽 철제문 뒤, 클로드는 비 내리는 숲가에 깊은 검은 우산을 든 채 홀로 서 있었습니다. 슬픔을 직접 다가와 위로하기에는, 그를 지켜보는 리처드의 눈이 너무 무겁고 위태롭다는 사실을 이미 15세의 나이에 처절히 감지하고 있었습니다.",
        image: "https://picsum.photos/seed/claude_2/600/400"
      },
      {
        id: "claude_3",
        title: "랭글리 파산 당일, 닫힌 은회색 차유리",
        date: "2016 · 01.09",
        subtitle: "The Locked Griseous Window of Foreclosure",
        desc: "랭글리 가문의 무조건 파산이 확정되어 은식기들과 도자기가 반출되던 날. 리처드의 호송 기사 차량 뒷좌석에 앉아 있던 클로드는 은회색 선팅된 유리를 한 치도 내리지 않았습니다. 유저의 절박한 목소리가 유리를 두드렸으나, 그는 입을 다문 채 차를 출발시켰습니다. 그것이 그가 유저를 구하기 위해 지켜낸 첫 장치이자 침묵이었습니다.",
        image: "https://picsum.photos/seed/claude_3/600/400"
      },
      {
        id: "claude_4",
        title: "무설명 이탈의 마지막 역 광장",
        date: "2017 · 08.31",
        subtitle: "The Departure without Words",
        desc: "여름의 마지막 날 밤, 약속했던 내셔널 레일 기차역 대기소. 유저는 낡은 벤치에서 하염없이 그를 기다렸으나, 클로드는 시든 장미 한 송이만 홀로 남겨두고 어둠 속에 모습을 감췄습니다. 리처드 헤론의 추적망에서 유저를 격수하여 지켜내기 위한 어쩔 수 없는 영미권 유학 행로였고, 9년간의 모진 기나긴 간극이 이 벤치에서 시작되었습니다.",
        image: "https://picsum.photos/seed/claude_4/600/400"
      },
      {
        id: "claude_5",
        title: "귀국 당일, 런던 타워 임원실의 창문",
        date: "2026 · Current",
        subtitle: "The Return and High-Rise Monologue",
        desc: "9년의 어둠을 버장하고 돌아와 헤론 오피스 타워 고층에 선 클로드. 시티 오브 런던의 차가운 빌딩숲과 멀리 보이는 이스트엔드의 탁한 연기를 응시하며, 그는 만년필 뚜껑을 천천히 돌려 닫습니다. 이제 그가 지불해온 기나긴 침묵의 대가를 유저에게 조용히 환산할 시간입니다.",
        image: "https://picsum.photos/seed/claude_5/600/400"
      }
    ]
  },
  {
    id: "julian",
    name: "Julian Heron",
    symbol: "Fox 🎭",
    meta: "25세 · 비상임이사 · 런던 소셜라이트",
    age: "25",
    height: "194 cm",
    appearance: {
      hair: "헝클어져 흘러내리는 묶은 금발 (사교계의 퇴폐적인 무드)",
      eyes: "반짝이는 여우눈 형태의 짙은 청안 (상대를 꿰뚫어보는 눈빛)",
      clothes: "넥타이를 매지 않고 재킷만 걸친 린넨 혼방 디자인",
      notable: "왼손 검지의 푸른 사파이어 반지, 언제나 장난스럽게 휘어진 입꼬리"
    },
    surface: "매사에 가볍고 장난기가 넘치며 다정한 사교계를 꾸미는 소셜라이트. 하지만 그의 농담에는 언제나 뼈가 있고, 헤론 가문의 비상임이사 직함을 갖고 있으나 실권은 부여받지 못한 가장 위험한 관찰자다.",
    hiddenInner: "2018년, 랭글리 가문이 완전히 짓밟히고 클로드가 영미권에서 유학하는 타이밍에 헤론에 공식 입적된 사생아. 리처드가 클로드를 채찍질하기 위해 들여놓은 '더 일하기 좋은 예비 도구'에 불과하다는 점을 명확히 안다. 가문의 화려한 지붕을 무너뜨릴 폭약을 뒤에서 천천히 조립하고 있다.",
    quote: "“왜 그렇게 다들 무겁게 굴어? 몰락한 가문의 재가 흩날리는 풍경도, 충분히 샴페인을 끼얹으면 꽤 화려한 축제가 되잖아.”",
    tags: ["2018년 전격 입적", "사교계의 스캔들", "가면극 수집가", "소리 없는 포획"],
    relationships: [
      { target: "User (Langley)", text: "“너와 난 사실 형제보다 가깝지 않아? 둘 다 리처드 헤론의 장난감 상자 속에 갇힌 불쌍한 존재들이잖아. 어때, 형 몰래 나랑 은밀한 협약이라도 하나 맺을래?”" },
      { target: "Claude Heron", text: "“고귀하신 적장자 형님. 영국식 위선과 얼어붙은 귀족 정신이 사람의 뼈를 취하면 정확히 당신의 형태일 겁니다.”" },
      { target: "Owen Ashby", text: "“소꿉시절 로맨스에 목숨이라도 건 변호사 양반. 랭글리의 유적지 주변을 배회하며 짖어댄다고 주인이 다시 살아나지는 않는답니다.”" }
    ],
    album: [
      {
        id: "julian_1",
        title: "소꿉놀이 도서관, 책장 뒤의 얼굴",
        date: "2010 · Spring",
        subtitle: "The Secret Behind the Library Shelves",
        desc: "헤론 저택의 웅장한 가문 도서관 한구석. 아직 사생아 신분으로 입적되지 않았을 때, 줄리안은 계단과 책장 뒤에 반쯤 숨어 클로드와 유저가 함께 놀던 평화로운 랭글리 시절을 지독한 흥미와 열등감 서까래 아래 관찰하고 있었습니다.",
        image: "https://picsum.photos/seed/julian_1/600/400"
      },
      {
        id: "julian_2",
        title: "랭글리의 몰락, 첼시 갤러리의 방종",
        date: "2016 · 01.09",
        subtitle: "The Chelsea Gallery After the Fall",
        desc: "유저의 가문이 완벽히 파산한 그 주 주말. 줄리안은 첼시의 프라이빗 갤러리 파티에서 흘러내린 셔츠 위에 화려하고 장난 어린 미소를 채우며 샴페인 잔을 들이켰습니다. 몰락해버린 역사의 잔재를 흥청거리는 유쾌한 제물로 환산해 바라보던 서늘함입니다.",
        image: "https://picsum.photos/seed/julian_2/600/400"
      },
      {
        id: "julian_3",
        title: "공식 적자 입적과 가주의 제안",
        date: "2018 · 03.20",
        subtitle: "The Baptism of the Outcast",
        desc: "봄비가 쏟아지던 영지의 비밀 서재. 유저가 무너지고 클로드가 해외에 가 있던 고요한 틈을 타, 리처드 회장으로부터 파란 사파이어 가문 인장 반지를 받으며 입적에 서명한 줄리안의 얼굴에는 복잡한 냉소가 스멀거립니다.",
        image: "https://picsum.photos/seed/julian_3/600/400"
      },
      {
        id: "julian_4",
        title: "메이페어 호텔 바, 새벽의 무레이블 피아노",
        date: "2022 · Midnight",
        subtitle: "The Midnight Non-Label Classic",
        desc: "아무도 들여놓지 않는 메이페어 헤론 호텔 프라이빗 깊은 바. 줄리안은 은밀하게 조명이 꺼진 새벽녘, 독하게 마신 술 향을 흘리며 레이블이 없는 오래된 피아노 건반을 짚고 거장들의 침울하고 엇갈리는 복선을 허망하게 뱉어내고 있었습니다.",
        image: "https://picsum.photos/seed/julian_4/600/400"
      },
      {
        id: "julian_5",
        title: "형 클로드의 취임식과 고독한 연기",
        date: "2026 · Current",
        subtitle: "The Cynic Clink of the Coping Light",
        desc: "런던 타워 복도 구석, 대연무 속에서 클로드의 귀국 환영 와인을 마시는 줄리안. 가슴에 달린 가짜 이사 직함의 모순을 응시하며 여우눈 가득 조롱 띤 웃음을 띄웁니다. 그가 엮어낼 진짜 장난감 폭약선은 이제 유저를 튕겨 나갈 듯 겨냥합니다.",
        image: "https://picsum.photos/seed/julian_5/600/400"
      }
    ]
  },
  {
    id: "richard",
    name: "Richard Heron",
    symbol: "Chess Black King ♟",
    meta: "48세 · Heron Group 회장 · 가주",
    age: "48",
    height: "202 cm",
    appearance: {
      hair: "짧게 깎아 단정한 은백색 금발 (시간이 내려앉은 위엄)",
      eyes: "차가운 칼날 같은 스틸 회색 눈빛 (빈틈이 전혀 느껴지지 않음)",
      clothes: "엄격한 더블 브레스티드 다크 새빌 정장, 고압적 풍채",
      notable: "장내 분위기를 한번에 사로잡는 강력한 음성 저주파, 턱선에 잘 다듬어진 수염"
    },
    surface: "그는 장내에 들어설 때 항상 대화의 리듬을 일부러 0.5박자 늦춘다. 절대 목소리를 높이거나 노하지 않으나, 공간 내의 모든 이들을 본능적으로 굴복시키고 압박한다. 진짜 무거운 위협은 언제나 디저트 와인이 나온 뒤 조용히 이루어진다.",
    hiddenInner: "2016년 랭글리 가문을 압박하기 위해 금융망을 조종해 완벽한 '설계된 우연'을 만들어 파산에 이르게 했다. 세바스찬의 항구를 헐값에 손에 넣고 영국의 무역선로를 장악한 장본인. 자신의 친아들들조차 피도 눈물도 없는 테스트용 장기말로 배열하는 지독히 냉혹한 전제군주.",
    quote: "“사적인 감정은 없단다. 랭글리의 불행도, 아내의 상례도. 계약의 가치가 맞아떨어진 순간 일어난 정교한 수학일 뿐이지.”",
    tags: ["금융가의 거대 제왕", "차갑게 설계된 파멸", "2미터의 거구압박", "절대적 위계"],
    relationships: [
      { target: "User (Langley)", text: "“세바스찬의 아이구나. 네 어미의 무릎 밑에서 꼼지락대며 자두를 얻어먹던 꼬마가 아직 런던에서 접시를 닦고 있을 줄은 몰랐다만, 가끔 장미 정원에 찾아오려무나. 정취가 묻어나서 좋구나.”" },
      { target: "Claude Heron", text: "“내 훌륭한 후계자이자 영리한 개 한 마리. 나를 물어뜯기 위해 뒤쪽에서 서류를 모으는 그 영악함마저 마음에 드는구나. 계속해 보아라.”" },
      { target: "Kenneth Ashby", text: "“과거는 덮어두는 게 집사로서의 마지막 의무였을 터인데, 케네스. 늙은 손으로 쥐어짠 맹신이 네 자식을 무덤으로 보낼지도 모른단다.”" }
    ],
    album: [
      {
        id: "richard_1",
        title: "세바스찬과의 첫 악수, 2미터의 그림자",
        date: "2007 · Summer",
        subtitle: "The Looming Handshake of Devastation",
        desc: "세브노크스 저택 현관. 리처드는 세바스찬 랭글리의 미소를 받아내며 악수를 나눴으나, 그의 2미터가 넘는 거구 그림자는 이미 상대의 에스테이트 전체를 삼킬 듯 고압적으로 드리워져 있었습니다.",
        image: "https://picsum.photos/seed/richard_1/600/400"
      },
      {
        id: "richard_2",
        title: "아이리스 사망 당일, 비정한 벌목",
        date: "2014 · 04.17",
        subtitle: "The Pruning of the Silent Rose Garden",
        desc: "교통사고 소식이 울리던 밤, 서리주 별장. 리처드는 붉어진 장미 가자방의 벌목 가위를 들고 눈을 가늘게 떴습니다. 세바스찬과의 정적으로 얽힌 감정의 사슬을 차단하고 랭글리의 숨통을 끊을 실무를 조용히 개시하는 서막이었습니다.",
        image: "https://picsum.photos/seed/richard_2/600/400"
      },
      {
        id: "richard_3",
        title: "설계된 랭글리 가문 파산 서약",
        date: "2016 · 01.09",
        subtitle: "The Trapped Blueprint of Foreclosure",
        desc: "런던 중앙 지청 밀실서재. 리처드는 랭글리의 채무 이전 각본을 완강하고 도도한 얼굴로 검토한 후 검은 철필로 서명했습니다. 단 한 줄의 자비도 없는 수학적 파산의 함정이었습니다.",
        image: "https://picsum.photos/seed/richard_3/600/400"
      },
      {
        id: "richard_4",
        title: "줄리안의 입적, 체스판 위의 사생아",
        date: "2018 · 03.20",
        subtitle: "The Chess Movement of Placing Julian",
        desc: "전무가 유람을 고집하던 2018년 봄. 리처드는 가주의 이사회 판 뒤에서 어린 줄리안에게 은빛 배지를 달아주며 미소를 흘렸습니다. 클로드의 견고한 고압 자만을 부리기 위한 새 장기말의 정밀한 배열이었습니다.",
        image: "https://picsum.photos/seed/richard_4/600/400"
      },
      {
        id: "richard_5",
        title: "서리주 별장 정원, 11월의 차가운 와인",
        date: "2026 · Current",
        subtitle: "The Lord of the Manor and the Decanter",
        desc: "싸락눈이 섞여 내리는 영지의 자스민 온실. 리처드는 짙은 루비 빛 빈티지 와인을 무겁게 돌려 따릅니다. 그가 지배하는 체스 런던 판에 돌아온 클로드와 이스트엔드의 유저가 벌이는 마지막 균열을 바라보는 정중한 설계자의 눈입니다.",
        image: "https://picsum.photos/seed/richard_5/600/400"
      }
    ]
  },
  {
    id: "kenneth",
    name: "Kenneth Ashby",
    symbol: "Iron Key 🗝️",
    meta: "58세 · 前 Langley House 가 수석 집사장",
    age: "58",
    height: "178 cm",
    appearance: {
      hair: "가르마를 정갈하게 탄 희끗희끗한 백발",
      eyes: "흐려졌으나 중심이 대단히 견고한 온화한 갈빛 눈빛",
      clothes: "단정한 앤티크 집사복 코트와 낡은 은빛 회중시계",
      notable: "20년간 갈고 닦아 빛바랜 만년필, 품에 꼭 지닌 가죽 바인더 서류첩"
    },
    surface: "침묵과 극도의 충성심. 가문이 파산해 모든 고용인이 도망치던 2016년에도 자비를 들여 랭글리 가의 저택 문가에 지키고 서 있었다. 감정의 과잉이 전혀 없으며, 언제나 소리 없이 필요한 잔을 앞에 두고 사라지는 품격의 대변자.",
    hiddenInner: "랭글리 파산 당시, 리처드 헤론이 어떻게 영국 금융 시스템과 변호인단을 유혹하고 매수했는지 보여주는 극비 원천 증빙을 10년간 보존해 왔다. 현재는 이스트엔드의 구석진 연립주택에서 생활하며 당신의 재건과 역습을 위해 조용히 증거들을 검토하고 있다.",
    quote: "“지붕과 대들보가 모두 내려앉더라도, 성실한 집사라면 아가씨의 잔에 얼룩 하나 없는 차을 담아 한 치 흔들림 없이 내올 뿐입니다.”",
    tags: ["20년 가문측근", "재건의 열쇠", "비밀 바인더", "흔들림 없는 충직"],
    relationships: [
      { target: "User (Langley)", text: "“준비가 거의 되었습니다, 아가씨. 조만간 런던 가을 비가 시작되면, 우리가 헤론 저택의 은가마솥을 열 수 있는 열쇠를 돌려드리겠습니다.”" },
      { target: "Claude Heron", text: "“그분은 어릴 적부터 외롭게 계단을 채우던 분이셨지요. 랭글리를 등져가면서까지 세브노크스를 탈출하던 그의 뒷모습에 담긴 우수마저 미워하지 마십시오.”" },
      { target: "Owen Ashby", text: "“법전이 무기가 된다고 생각하느냐, 내 아들아. 상류사회의 지휘봉은 법전 뒤에 숨은 서명 한 개로 꺾이는 법이다. 자중하고 아가씨의 등 뒤를 엄호하거라.”" }
    ],
    album: [
      {
        id: "kenneth_1",
        title: "랭글리 하우스의 첫 성하 만찬",
        date: "2007 · Summer",
        subtitle: "The Golden Era Butler Service",
        desc: "아직 풍족하던 과거 랭글리 하우스 다이닝 홀. 수석 집사 케네스는 빛바래지 않은 최고급 은식기와 실크 냅킨을 격조 있게 정돈하며, 어린 유저와 가주 세바스찬의 온화한 저녁 식사를 그림자와 같이 시중들고 있었습니다.",
        image: "https://picsum.photos/seed/kenneth_1/600/400"
      },
      {
        id: "kenneth_2",
        title: "아이리스의 회중시계 조율 수행",
        date: "2014 · 04.17",
        subtitle: "The Timeless Watch in Mourning",
        desc: "아이리스 여사의 갑작스러운 고발 비극 직후. 케네스는 시간이 멈춰선 고요한 저택 거실에서, 밤새 은빛 앤티크 회중시계를 묵묵히 닦고 태엽을 맞췄습니다. 무너져가는 랭글리를 향해 그가 지켜낸 유일한 묵시록이었습니다.",
        image: "https://picsum.photos/seed/kenneth_2/600/400"
      },
      {
        id: "kenneth_3",
        title: "파산 통보, 가재도구 포장 반출",
        date: "2016 · 01.09",
        subtitle: "The Solemn Packing of Fallen Dynasty",
        desc: "붉은 법원 압류 씰이 기둥마다 나붙던 잔인한 날. 다른 고용인들이 급여 정산을 요구하며 저택을 탈출할 때, 케네스는 백발을 흐트러트리지 않고 조용히 랭글리 아가씨의 보자기와 찻잔만을 귀품 있게 따로 모아 상자에 개별 포장했습니다.",
        image: "https://picsum.photos/seed/kenneth_3/600/400"
      },
      {
        id: "kenneth_4",
        title: "비밀 증빙 원본, 가죽 바인더의 보존",
        date: "2017 · Autumn",
        subtitle: "The Preservation of the Dark Record",
        desc: "안개가 깊은 이스트엔드의 버려진 창고 밀실. 케네스는 랭글리의 세바스찬이 리처드에 의해 교묘히 주식 시장에서 사기당해 항구를 무상 이전 하도록 압박받은 비밀 협정 서류첩을 닳아빠진 가죽 바인더 속에 단호히 고정해 숨겨두었습니다.",
        image: "https://picsum.photos/seed/kenneth_4/600/400"
      },
      {
        id: "kenneth_5",
        title: "이스트엔드 연립주택의 빗소리 속 홍차",
        date: "2026 · Current",
        subtitle: "The Humble Brew in a Tin Cup",
        desc: "승강기도 작동하지 않는 허름한 4층 자취방 창틀. 희끗희끗한 백발의 늙은 켄은 여전히 소량의 홍차 잎을 정갈하게 우려내어, 일터를 마치고 돌아온 랭글리의 유일한 슬픈 상속인 유저에게 얼룩 없는 잔을 잔잔하게 바칩니다.",
        image: "https://picsum.photos/seed/kenneth_5/600/400"
      }
    ]
  },
  {
    id: "owen",
    name: "Owen Ashby",
    symbol: "Leaf 🌿",
    meta: "26세 · Kenneth의 아들 · 랭글리 전속 변호인",
    age: "26",
    height: "186 cm",
    appearance: {
      hair: "깔끔하고 정돈된 짙은 갈색 고수머리 (지적이고 신뢰감 있음)",
      eyes: "강직함을 담은 올리브색 녹갈색 안동 (유저를 볼 때만 부드러워짐)",
      clothes: "적당히 닳은 트위드 재킷과 가죽 크로스 가방",
      notable: "손목에 끼워둔 속기용 필기 링, 이스트엔드가 묻어 있는 거친 구두"
    },
    surface: "신뢰감을 주는 미소와 철두철미한 법률 지식. 귀족들을 불신하며 가난한 이들의 법조인 역할을 자처한다. 랭글리의 세바스찬 덕분에 학업을 마칠 수 있었다는 깊은 고마움을 잊지 않아 유저의 주위에 가장 성실하고 열성적인 변호인이자 사적인 소꿉친구로 곁을 지킨다.",
    hiddenInner: "사실 유저가 켄트 지방에서 무릎을 꿇고 울던 여름날부터 짝사랑해 왔다. 헤론 그룹의 위세를 무너뜨릴 완벽한 법적 소송을 단독 준비하다 매번 상류 계급 카르텔의 묵시적 협박으로 메이저 로펌에서 밀러났다. 클로드 헤론의 귀국 소식을 전해 듣고 질투와 서늘한 분노로 밤잠을 설친다.",
    quote: "“난 그들의 케케묵은 가문 문장 따위에 관심 없어. 오직 네가 어두운 이스트엔드의 자취방에서 홀로 훔치던 눈물에만 복수하고 싶다.”",
    tags: ["소꿉친구 재회", "계급의 굴레", "유일한 아군", "이스트엔드의 변호선"],
    relationships: [
      { target: "User (Langley)", text: "“저들이 아무리 30층 유리빌딩 위에서 우릴 조롱해도, 내 다리가 꺾이기 전에 반드시 리처드 헤론이 법정에 출두해 서명하도록 만들 거야. 약속할게.”" },
      { target: "Claude Heron", text: "“위선의 극치를 보여주는 화려한 시계. 9년 전에 버려두고 떠났던 이의 가슴에 또 손을 대시겠다면, 내가 당신의 새빌 로 슈트에 피를 튀겨드리죠.”" },
      { target: "Julian Heron", text: "“장난기 뒤에 고약한 비아냥을 숨기지 마십시오. 당신 역시 그들의 문 안에서 비참하게 버티는 기생수일 뿐임을 내 서류 가방이 가리키고 있으니까요.”" }
    ],
    album: [
      {
        id: "owen_1",
        title: "소꿉시절 켄트 들판의 풀꽃반지",
        date: "2007 · Summer",
        subtitle: "The Innocent Field the Laughter Ring",
        desc: "헤론 저택을 방문하기 전, 켄트의 야생 숲과 평온함. 오웬은 유저와 세바스찬의 그늘 뒤에서, 들에 핀 가시 줄기로 엉성한 풀꽃반지를 엮어 유저의 연약한 손가락에 조심스레 끼워주고 혼자 얼굴을 붉혔을 때의 순수함입니다.",
        image: "https://picsum.photos/seed/owen_1/600/400"
      },
      {
        id: "owen_2",
        title: "손수건을 쥐여주던 눈물의 오후",
        date: "2014 · 04.17",
        subtitle: "The Soft Handkerchief of Rainy Hope",
        desc: "교통사고 소식이 오고, 랭글리 정원에 슬픔이 덮친 날. 오웬은 비를 피해 서재 복도 구석에서 숨죽여 오열하던 유저의 곁으로 다가가, 단단한 손으로 조금 구겨진 면 손수건을 주머니에서 꺼내어 조용하게 건네던 소년이었습니다.",
        image: "https://picsum.photos/seed/owen_2/600/400"
      },
      {
        id: "owen_3",
        title: "변호사 자격 합격과 소송의 초안",
        date: "2016 · 01.09",
        subtitle: "The Attorney Certificate and Vow of Retribution",
        desc: "파산 선고 당일, 법전 무더기와 전공 서적을 뒤로한 오웬. 그는 랭글리 가문의 무고한 항구 몰수를 되돌리기 위해 런던 사법시험 합격 문구 뒤에 첫 소송 제기장을 눈물을 참으며 설계하기 시작했습니다.",
        image: "https://picsum.photos/seed/owen_3/600/400"
      },
      {
        id: "owen_4",
        title: "런던 튜브 지하철역, 차가운 바람의 밤",
        date: "2018 · Fall",
        subtitle: "The Windy Platform of Abandoned Soul",
        desc: "클로드가 침묵 속으로 도피하고 유저마저 이스트엔드 올드 가의 단칸방으로 잠입하던 시절. 오웬은 매일 저녁 런던 튜브의 소음과 지하철 풍속 속에서, 유저의 통학이나 일터 퇴근길 방향을 멀찍이 귀환 수행하며 가죽 가방을 붉어지게 쥐고 있었습니다.",
        image: "https://picsum.photos/seed/owen_4/600/400"
      },
      {
        id: "owen_5",
        title: "리처드를 겨냥하는 극비 법률 바인더",
        date: "2026 · Current",
        subtitle: "The Leather Case and Restive Fire",
        desc: "클로드의 갑작스러운 귀국 기사를 신문 1면에서 발견한 오늘 아침. 오웬은 엉성하고 저렴한 이스트엔드 사무실에서, 지난 10년간 모은 리처드 헤론의 은행 송금 부적법 판별 보고서 가방 단추를 지그시 채웁니다. 이제 그는 친구에서, 유일한 사법 아군서 기필코 헤론의 목덜미를 채게 될 것입니다.",
        image: "https://picsum.photos/seed/owen_5/600/400"
      }
    ]
  }
];

export const CLASS_TIERS: ClassTier[] = [
  {
    tier: "Tier 1",
    name: "구 귀족 세력 (Old Money)",
    desc: "공식 작위와 고성 에스테이트를 보유한 전통 젠트리. 귀빈 연회에 불청객으로 행동하는 것이 그들의 침묵 무기다.",
    context: "헤론과 랭글리조차도 한 수 접어주는 은밀하고 거만한 계급. 하지만 자산 규모에서는 금융 거물인 헤론 그룹에게 서서히 추월당하고 있다.",
    active: false
  },
  {
    tier: "Tier 2",
    name: "신흥 금융 제왕 (The Herons)",
    desc: "헤론 가문. 시티 오브 런던의 은행들과 증권망, 헤론 타워를 소유한 영국의 심장부 실세.",
    context: "화려한 백금발과 무표정이 시그니처. 돈보다 서명을 귀하게 여기며 정중하게 웃으며 상대방의 자취를 영원히 증발시킬 수 있다.",
    active: true,
    highlight: true
  },
  {
    tier: "Tier 3 → 5",
    name: "락 가문 (Fallen Langleys)",
    desc: "랭글리 가문. 전통 있는 귀족 전문직이자 세브노크스의 대저택 소유주였으나 2016년 원인 미상의 파산 공식화.",
    context: "모든 보호막이 단 하루 만에 제거되었으며, 세바스찬마저 가을날 돌연 실종된 이후 9년간 런던의 차가운 눈총을 맨몸으로 받아냈다.",
    active: true,
    fallen: true
  },
  {
    tier: "Tier 5 (Current)",
    name: "랭글리의 생존자 (User)",
    desc: "이스트엔드 구석방에서 생존해 온 현재의 유저. 계급에 균열을 내기 위한 증거를 숨겨둔 가장 가난한 상속인.",
    context: "당신은 매일 수많은 고급 매장에서 고개를 숙이며 마침내 클로드 헤론의 9년 만의 취임식을 뉴스 스크린에서 보게 된다.",
    active: true
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "2007 · Summer",
    event: "세브노크스 저택의 첫 정적",
    note: "헤론 가문의 대저택 계단 중간에 선 한 백금발 소년 클로드가 내려다보았다. 세바스찬이 리처드와 악수를 나누는 어지러운 여름 먼지 속에서, 두 사람의 9년짜리 실타래가 시작되었다.",
    isKey: true,
    type: "meeting"
  },
  {
    date: "2008 · 11.03",
    event: "Eleanor 병사 (클로드의 어머니)",
    note: "리처드는 임종 소식이 도착한 순간 불참했으며, 런던 증권거래소 회의실에서 보드를 지켰다. 클로드는 그 겨울을 홀로 견뎠다.",
    isLoss: true,
    type: "loss"
  },
  {
    date: "2010 · Spring",
    event: "헤론 – 랭글리 가문의 기묘한 밀착",
    note: "두 가문은 사방의 언론에 장미꽃 소식을 전하며 제휴했다. 두 아이는 마차를 함께 타고 도서관 책장 사이에 앉아 서로의 비밀 암호를 만들었다.",
    type: "shift"
  },
  {
    date: "2013 · Late Winter",
    event: "밀착의 가장 찬란했던 수면",
    note: "황실 극무도회에 랭글리와 헤론의 장식선이 수놓였다. 두 사람의 조용한 대화가 발코니에서 샴페인을 타고 내렸고 모두가 이들이 하나가 될 거라 예견했다.",
    type: "shift"
  },
  {
    date: "2014 · 04.17",
    event: "Iris의 가을 비 속 교통사고 (유저의 어머니)",
    note: "봄바람 끝에서 일어난 비극. 세바스찬은 주먹을 쥐고 리처드에 맞섰으나, 헤론의 기사단과 경찰은 전면적인 증거 불충분을 외쳤다.",
    isLoss: true,
    type: "loss"
  },
  {
    date: "2016 · 01.09",
    event: "랭글리 가문 파산 공식 선언",
    note: "신년 연휴가 가시기 전, 모든 은행 자산이 헤론 홀딩스의 임시 채무 계좌로 송금되었다. 랭글리를 수놓던 은식기들은 단 3일 만에 포장되어 실려나갔다.",
    isLoss: true,
    type: "loss"
  },
  {
    date: "2016 · 09.22",
    event: "Sebastian Langley의 흔적 부재",
    note: "가을 첫 안개가 깔린 아침, 유저에게 미리 전한 편지나 메시지도 없이 허름한 수트 상의만 남겨둔 채 수장 세바스찬이 행방불명되었다.",
    isLoss: true,
    type: "loss"
  },
  {
    date: "2017 · 08.31",
    event: "Claude, 이유 없는 무설명 이탈",
    note: "여름의 가장 늙은 날 저녁. 약속한 역 광장 벤치에는 한 떨기 시든 장미만 있었다. 클로드는 작별인사 한 마디 없이 런던을 극적으로 이탈했다. 9년의 완강한 어둠의 시작.",
    isKey: true,
    type: "shift"
  },
  {
    date: "2018 · 03.20",
    event: "사생아 Julian Heron, 공식 입적 등록",
    note: "봄비가 무색하리만큼 가려진 이사회 뒤. 클로드의 질투를 자극하든, 랭글리의 유산을 완벽히 말소하든 리처드는 줄리안에게 가문 금빛 배지를 안겼다.",
    type: "shift"
  },
  {
    date: "2026 · Current",
    event: "클로드의 귀국, 그리고 취임식의 정적",
    note: "9년 동안 대륙을 돌며 몸을 사린 클로드가 마침내 백금발을 고정 한 채 런던 본사 MD 자리에 복귀했다. 그의 손끝이 다시 랭글리가 남겨둔 이스트엔드를 천천히 가리킨다.",
    isKey: true,
    type: "current"
  }
];

export const LOCATIONS: LocationIndex[] = [
  {
    id: "heron_tower",
    icon: "🏦",
    name: "Heron Tower",
    address: "시티 오브 런던 (City of London)",
    desc: "차갑고 단말기 소음조차 사치로 통하는 시티 오브 런던의 검은 투명 타워. 감정은 한 장의 지불 전표로 환산되고, 만년필 뚜껑을 맞추는 스냅 소리가 층 내의 유일한 개인적 악음.",
    who: ["Claude Heron", "Julian Heron"]
  },
  {
    id: "heron_hotel",
    icon: "🏨",
    name: "Heron Hotel",
    address: "메이페어 (Mayfair, London)",
    desc: "귀중품들을 실어오는 벨벳 응접차와 사파이어 샹들리에 밑. 하층 직원들이 드나드는 철제 격문 문턱과 5층 스위트 VIP실 솜러그 사이의 딱 2cm 두께 차이가 바로 거대한 영국의 계급 격차.",
    who: ["Julian Heron", "Richard Heron"]
  },
  {
    id: "heron_mansion",
    icon: "🏛️",
    name: "Heron Mansion (Sevenoaks)",
    address: "켄트 세브노크스 (Sevenoaks, Kent)",
    desc: "15세기 참나무로 지어진 가문의 유서 소굴. 서쪽 날개 복도 끝에 위치한 피아노룸은 클로드 어머니 사망 직후 자물쇠가 채워졌고, 랭글리 가문의 흔적을 아는 조각상들이 침묵한다.",
    who: ["Richard Heron", "Claude Heron", "Julian Heron"]
  },
  {
    id: "richards_villa",
    icon: "🌹",
    name: "Richard's Villa",
    address: "서리주 영지 (Surrey)",
    desc: "가주 리처드가 매년 가을 장미 나무를 뿌리째 태우고, 봄이 돌아오면 새 하얀 자스민을 수놓는 설계 정원. 철문을 통과하려면 가문의 서약서가 필요하다.",
    who: ["Richard Heron"]
  },
  {
    id: "ashby_flat",
    icon: "🏠",
    name: "Ashby Flat",
    address: "이스트엔드 (East End, London)",
    desc: "유저가 랭글리 몰락 이후 도망쳐 머무는 가파른 월세 플랫. 승강기 없이 세바스찬의 부하였던 케네스 부자가 사비를 모아 얻어낸, 빗소리가 가장 적나라하게 스며드는 마지막 낙원.",
    who: ["Kenneth Ashby", "Owen Ashby", "User (Langley)"]
  },
  {
    id: "east_end",
    icon: "🌫️",
    name: "East End",
    address: "이스트엔드 올드 가 (East London)",
    desc: "헤론의 비싼 수트 궤적이 발을 들이기 가장 불쾌해하는, 매캐한 연기와 공장 불빛이 명灭하는 빈민 자취지. 하지만 저들에게서 빼앗긴 랭글리의 계약 조각들이 유령처럼 정처 없이 떠도는 구의 심장.",
    who: ["User (Langley)", "Owen Ashby"]
  }
];
