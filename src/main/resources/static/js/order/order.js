// 모달창 관련
if(loginMember != null){ // 로그인한 회원만
  document.getElementById("orderDetailShipping").addEventListener("click", () => {
    document.getElementById("orderShippingBack").style.display="block";
    document.getElementById("orderShippingContent").style.display="block";
    document.body.style.overflowY = "hidden";
  })
  
  document.getElementById("orderShippingBack").addEventListener("click", () => {
    document.getElementById("orderShippingBack").style.display="none";
    document.getElementById("orderShippingContent").style.display="none";
    document.body.style.removeProperty('overflow');
  })
  
  document.getElementById("orderDetailCoupon").addEventListener("click", () => {
    document.getElementById("orderCouponBack").style.display="block";
    document.getElementById("orderCouponContent").style.display="block";
    document.body.style.overflowY = "hidden";
  })
  
  document.getElementById("orderCouponBack").addEventListener("click", () => {
    document.getElementById("orderCouponBack").style.display="none";
    document.getElementById("orderCouponContent").style.display="none";
    document.body.style.removeProperty('overflow');
  })
  document.getElementById("orderCouponCancel").addEventListener("click", () => {
    document.getElementById("orderCouponBack").style.display="none";
    document.getElementById("orderCouponContent").style.display="none";
    document.body.style.removeProperty('overflow');
  })
};

// 배송 관련 정보 세팅--------------------------------------------------------------
// 주문자 환불정보 세팅
if(orderMember.refundBank != null){
  document.getElementById('refundBank').children[parseInt(orderMember.refundBank)-1].selected = true;
};
// 주소 잘라서 세팅
if(orderMember.memberAddress !=null){
  const arr = orderMember.memberAddress.split("^^^");
  document.querySelectorAll("input[name='memberAddress']").forEach( (item, i) =>{
    item.value = arr[i];
  } );
}

// 받는 사람
const orderDetailSame = document.getElementById('orderDetailSame');
const orderDetailNew = document.getElementById('orderDetailNew');
// 받는 사람 이름
const orderRecvName = document.querySelector('[name="orderRecvName"]');
// 받는 사람 전화번호
const orderRecvPhone = document.querySelector('[name="orderRecvPhone"]');

// 주소지 전환
const orderRecvAdd = document.querySelector('[name="orderRecvAdd"]'); // 제출용세팅
// 주문자 정보와 동일
orderDetailSame.addEventListener('click', () => {
  orderRecvName.value = orderMember.memberName;
  orderRecvPhone.value = orderMember.memberPhone;
  const arr = orderMember.memberAddress.split("^^^");
  document.querySelectorAll("input[name='receiverAddress']").forEach( (item, i) =>{
    item.value = arr[i];
  } )
  orderRecvAdd.value = addAll[3].value+"^^^"+addAll[4].value+"^^^"+addAll[5].value;
});
// 새로운 배송지
orderDetailNew.addEventListener('click', () => {
  orderRecvName.value = "";
  orderRecvPhone.value = "";
  document.querySelectorAll("input[name='receiverAddress']").forEach( (item, i) =>{
    item.value ="";
  } )
  orderRecvAdd.value = "";
});

// 결제 계산하기--------------------------------------------------------------

// 상품 가격 계산
const table = document.getElementById("mypageOrderProduct");
let totalAmount = 0; // 총상품금액
let totalDiscount = 0; // 총할인금액
let totalPoint = 0; // 총적립금

for (let i = 1; i < table.rows.length - 1; i++) {
  let row = table.rows[i];
  
  let point = parseInt(row.cells[0].children[0].value)
  let quantity = parseInt(row.cells[3].innerText);
  let price = parseInt(row.cells[4].innerText.replace(",", ""));
  let rowAmount = quantity * price;

  totalAmount += rowAmount; // 총상품금액

  if (row.cells[5] != null) {
    let discountAmount = Math.abs(parseInt(row.cells[5].innerText.replace(",", "")));
    totalDiscount += quantity * discountAmount; // 총할인금액
  }
  totalPoint += point; // 총적립금
}

// 주문상품 총 금액 세팅
document.getElementById("totalPrice").innerText = totalAmount.toLocaleString() + '원'; // 주문상품정보 총금액
document.getElementById("totalAmount").innerText = totalAmount.toLocaleString() + '원'; // 결제정보의 주문상품
document.querySelector("input[name=orderTotalPrice]").value = totalAmount; // 제출용 값 세팅

// 상품 총 할인 금액 세팅
document.getElementById("totalDiscount").innerText = totalDiscount.toLocaleString() + '원'; // 주문상품정보 총할인금액

// 배송비 세팅
let delivery = 2500;
if(totalAmount > 100000){
  delivery = 0;
  document.getElementById('deliveryPrice').style.color='#ccc';
  document.getElementById('deliveryPrice').style.textDecoration='line-through';
}
document.getElementById('totalDelivery').innerText = delivery.toLocaleString() + '원';

let couponDis = 0;

if(loginMember != null){ // 로그인한 회원일시
  // 쿠폰 적용하기--------------------------------------------------------------
  // 쿠폰 제한 금액과 상품총금액 비교
  const couponList = document.querySelectorAll('.orderCoupon-coupon-list');
  const applyBtn = document.getElementById('applyBtn'); // 적용하기 버튼
  const cn = document.getElementById("couponNo"); // 쿠폰번호세팅
  const cp = document.getElementById("couponDiscount"); // 쿠폰적용 할인가 화면표시

  let couponNoC = [];

  for(c of couponList){
    let couponCondition = c.children[0].children[1].getAttribute('value'); // 쿠폰적용최소가격
    let couponNo = c.children[0].children[0].getAttribute('value');
    let couponUnit = c.children[0].children[2].getAttribute('value')
    let couponAmount = c.children[0].children[3].getAttribute('value')
    let couponMaxDiscount = c.children[0].children[4].getAttribute('value')

    const couponSelect = c.children[2];

    if(totalAmount < parseInt(couponCondition)){ // 쿠폰 적용불가능판단 후 선택불가
      couponSelect.children[1].children[0].innerText= '적용불가'
      couponSelect.style.pointerEvents = 'none';
    }else{ // 사용가능시 쿠폰적용할인금액 계산
      if(couponUnit == 'p'){ // 할인율일때
        if(totalAmount * couponAmount * 0.01 < couponMaxDiscount){
          couponMaxDiscount = totalAmount * couponAmount * 0.01
        }
      }
    }
    couponNoC.push([couponNo,couponMaxDiscount])
  }

  applyBtn.addEventListener('click',() => {
    // 모달창 닫기
    document.getElementById("orderCouponBack").style.display="none";
    document.getElementById("orderCouponContent").style.display="none";
    document.body.style.removeProperty('overflow');
    // 체크된 인덱스번호가져오기
    if(document.querySelector('input[name="useCoupon"]:checked') != null){
      // 체크된 인덱스번째의 쿠폰번호, 쿠폰적용할인가격 계산후 세팅
      const checked = document.querySelector('input[name="useCoupon"]:checked').getAttribute('id').slice(-1);
      cn.value = couponNoC[checked][0]; // 쿠폰 적용 번호 세팅
      cp.innerText = parseInt(couponNoC[checked][1]).toLocaleString(); // 쿠폰 적용 금액 세팅
      // 쿠폰할인금액 세팅
      couponDis = parseInt(couponNoC[checked][1]);

    }
  })


    // 예상적립금 세팅
    document.getElementById("productPoint").innerText = totalPoint.toLocaleString() + '원';
    document.querySelector("input[name=productPoint]").value = totalPoint; // 제출용

    // 포인트 사용
    const memberPoint = document.getElementById("memberPoint").innerText;
    const pointInput = document.querySelector("input[name=usePoint]");
    // 전액사용 포인트 버튼
    document.getElementById("pointBtn").addEventListener('click', () => {
      pointInput.value = memberPoint;
    });
    // 포인트 입력시 사용포인트 제어
    pointInput.addEventListener('input', e => {
      const value = parseInt(e.target.value);
      
      if (isNaN(value) || value < 0 || value > orderMember.memberPoint) {
        e.target.value = "";
      }else{
        let usep = parseInt(memberPoint.replace(",", "")) - parseInt(e.target.value);
        document.getElementById("memberPoint").innerText = usep.toLocaleString();
        // 할인적용 총 금액 세팅
        document.getElementById("applyDiscount").innerText = '-' + (totalDiscount + couponDis + usep).toLocaleString() + '원';
        document.getElementById("payDiscount").innerText = '-' + (totalDiscount + couponDis + usep).toLocaleString() + '원'; // 제출용
      }
      if(e.target.value == ""){
        document.getElementById("memberPoint").innerText = memberPoint;
      }
    });



    // 할인적용 총 금액 세팅
    document.getElementById("applyDiscount").innerText = '-' + (totalDiscount + couponDis).toLocaleString() + '원';
    document.getElementById("payDiscount").innerText = '-' + (totalDiscount + couponDis).toLocaleString() + '원'; // 제출용
    // 최종결제금액 세팅
    const payment = totalAmount - totalDiscount + delivery;
    document.getElementById("payment").innerText = payment.toLocaleString() + '원';
    document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
    document.querySelector("input[name=orderPayment]").value = payment;
}else{

  // 할인적용 총 금액 세팅
  document.getElementById("applyDiscount").innerText = '-' + (totalDiscount + couponDis).toLocaleString() + '원';
  document.getElementById("payDiscount").innerText = '-' + (totalDiscount + couponDis).toLocaleString() + '원'; // 제출용

  // 최종결제금액 세팅
  const payment = totalAmount - totalDiscount + delivery;
  document.getElementById("payment").innerText = payment.toLocaleString() + '원';
  document.getElementById("paymentBtn").innerText = payment.toLocaleString() + '원 결제하기';
  document.querySelector("input[name=orderPayment]").value = payment;
}


// -----------------------------------------------------------------------------

// 유효성검사