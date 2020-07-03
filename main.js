$(function () {
  const page_type = $(".contents").attr("id");
  const category = ["men", "woman", "kids"];
  const param_key = location.search.substring(1).split("=")[0];
  const param_value = location.search.substring(1).split("=")[1];

  let more_count = {
    brand: 3,
    items: 10,
  };

  function moreContoroul(el, num) {
    const more_type = $(el).attr("data-more-btn");

    const target_list = $(`[data-more-list="${more_type}"]`);

    const max_num = target_list.find("li").length;
    more_count[more_type] += num;

    target_list.find(`li:lt(${more_count[more_type]})`).fadeIn();
    if (more_count[more_type] >= max_num) {
      $(el).hide();
    }
  }
  $("[data-more-btn]").on("click", function () {
    moreContoroul($(this), 3);
  });
  $("[data-more-btn]").on("click", function () {
    moreContoroul($(this), 10);
  });
  $(".word-search")
    .focus(function () {
   
      $(this).addClass("is-cursor");
    })
    .blur(function () {
      $(this).removeClass("is-cursor");
    });
  //オブジェクトをhtmlに変換する
  //返り血は:html
  function createDom(items, delete_btn_flg = null) {
    let html_template = "";
    let delete_dom = '';
    if(delete_btn_flg){
        delete_dom = '<div class="cart-delete"><img src="img/icon_delete.svg"></div>'
    }
    items.forEach(function (item,index) {
        
       html_template += `<li class="item" data-item-id="${item["id"]}">
            <a href="detail.html?id=${item["id"]}">
                <div class="item-cap"><img src="img/item/${item["id"]}.png" alt="" loading="lazy">
                </div>
                <div class="item-info">
                    <h3 class="item-name">${item["name"]}</h3>
                    <h3 class="item-text">${item["text"]}</h3>
                    <div class="item-price">${item["price"]}</div>
    
                </div>
            </a>
            ${delete_dom}
        </li>`;
        
    });
    return html_template;
  }

  function searchWordShow() {
    let result_text;
    if (param_key == "price") {
      result_text = `〜${param_value}円`;
      $(`.price-select option[value="${param_value}"]`).prop("selected", true);
    } else {
      result_text = param_value;
    }

    $(".result_text").text(decodeURI(result_text));
  }

  function getItemSingle() {
    return item_data.find(function (item) {
      return item["id"] == param_value;
    });
  }
  getItemSingle();
 
  function getItemList(key, value = null) {
    const search_value = value ? value : param_value;
    const freeword = ["name", "text"];
    const items = item_data.filter(function (item, index) {
      switch (key) {
        case "brand":
        case "category":
          return item[key] == search_value;
          break;
        case "freeword":
          return freeword.find(function (freeword) {
            return item[freeword].indexOf(decodeURI(param_value)) !== -1;
          });
          break;
        case "price":
          return item["price"] <= search_value;
          break;
        case "new":
          return item["new"];
          break;
      }
    });

    searchWordShow();
    return items;
  }

  getItemList(param_key, param_value);

  function pickUpShuffle(item_data) {
    let items = [];
    let rand_check = [];
    for (let i = 0; i < 6; i++) {
      let j = Math.floor(Math.random() * item_data.length);
      if (rand_check.indexOf(j) !== -1) {
        i--;
        continue;
      } else {
        rand_check.push(j);
        items.push(item_data[j]);
      }
    }

    return items;
  }
  // console.log( pickUpShuffle(item_data));
  pickUpShuffle(item_data);
  //getItemList(category,'men');

  // $('[data-item-list="new"]').append(item_li);
//カートの関数


function doneFlash(text){
    $('body').append(`<div class="flash">${text}</div>`);
    setTimeout(function(){
        location.reload();

    },1000);
    

}



  function strageControl(id,storage_type) {
    let storage_data = JSON.parse(localStorage.getItem(`ninco_${storage_type}`));
    id = Number(id);
    if (storage_data == null) {
      storage_data = [id];//配列形式
    } else {
      if (storage_data.indexOf(id) !== -1) {
        storage_data.splice(storage_data.indexOf(id), 1);
      } else {
        storage_data.push(id);
      }
    
    }
    localStorage.setItem(`ninco_${storage_type}`, JSON.stringify(storage_data));
  }


function storageSaveJudge(id,storage_type){
    let storage_data = JSON.parse(localStorage.getItem(`ninco_${storage_type}`));
    id = Number(id);
   
    if( storage_data !== null){
        return storage_data.indexOf(id) !== -1;
    }


}


  //トップスライダー
  $(".top-slider").slick({
    autoplay: true,
    arrows: true,
    dots: true,
    speed: 1500,
    easing: "swing",
    centerMode: true,
    centerPadding: "25%",
    prevArrow: '<div class="slide-btn prev-btn">',
    nextArrow: '<div class="slide-btn next-btn">',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0%",
          slidesToScroll: 1,
        },
      },
    ],
  });





  //ハンバーガーメニュー
  $(".menu-trigger").on("click", function () {
    $(this).toggleClass("is-active");
    $(".header-links").toggleClass("is-active");
  });
  //サイズ

  $(".item-size-list li").on("click", function () {
    const select_size = $(this).text();
    $(this).addClass("is-active");
    $(this).siblings("li").removeClass("is-active");
    $(".item-size-select span").text(select_size);
  }); //レビュー
  let review = 0;
  $(".review li").on("click", function () {
    if (review == $(".review li").index(this) + 1) {
      $(".review li").removeClass("is-active");
      review = 0;
      // review = 0;
    } else {
      review = $(".review li").index(this) + 1;
      $(".review li").removeClass("is-active");
      $(`.review li:lt('${review}')`).addClass("is-active");
    }
    // let review = $('.review li').index(this) + 1;

    // $('.review li:lt(' + review + ')').addClass('is-active');
    //便利な書き方
  });

  ///アイテム詳細アコーディオン
  $('[data-accordion="trigger"]').on("click", function () {
    $(this).toggleClass("is-active");
    $(this).next().slideToggle();
  });

  $(".controls-cart").on("click", function (e) {
    e.preventDefault();
    $(".modal-wrap").fadeToggle();
    $(".menu-trigger, .header-links").removeClass("is-active");
  });
  $(".modal-close,.modal-wrap").on("click", function (e) {
    $(".modal-wrap").fadeOut();
  });


  //カートに入れたアイテムを生成

  const cart_storage = JSON.parse(localStorage.getItem("ninco_cart"));
 
  if(   cart_storage  !== null){
      let cart_price = 0;
  const cart_items = item_data.filter(function(item){
      if(cart_storage.indexOf(item['id']) !== -1){
          cart_price += item['price'];
          return item;
      }
     
  });
  //カートの合計金額を生成
  　$('.cart-total-price').text(cart_price + '円');
  //カートの合計点数を出力
  
   let cart_lenght = $('.cart-batch,.cart-total-num').text(cart_storage.length);
  // console.log(cart_lenght);
  //console.log(cart_storage);
  if( cart_lenght <= 0){
      
      $('.cart-batch').hide();

  }
//お気に入りに追加
$(".btn--fav").on("click", function () {
    const item_id = $(this).parents(".item-detail").attr("data-item-id");
    strageControl(item_id, 'fav');
    //  console.log(item_id);
   
    if( storageSaveJudge(item_id,'fav')){
       doneFlash('お気に入りに追加しました');
      

    }else{
       doneFlash('お気に入りから外しました');
    
    }
  
  });

  //カートのDOMを生成
  let item =  $('#cart-list').append(createDom(cart_items,true));
  //console.log(item);
  }else{
      $('.cart-batch').hide();
  }
 //カートの中身を削除
 $('body').on('click','.cart-delete',function(){
     if(confirm('本当に削除して良いですか？')){

        const item_id = $(this).parents('[data-item-id]').attr('data-item-id');
        alert(item_id);
        strageControl(item_id,'cart');
        setTimeout(function(){
            location.reload();
        },200);
     }
   
 })

 //購入ボタンを押した時の処理
$('.btn--buy').on('click',function(){
    if( confirm('購入していいですか？') ){
        localStorage.removeItem('ninco_cart');
        alert('購入しました');
    }
})

  //トップページだけに行う処理
 
  let item_list_pickup = createDom(pickUpShuffle(item_data));

  $('[data-item-list="pickup"]').append(item_list_pickup);

  //カートに追加
  $(".btn--cart").on("click", function () {
    const item_id = $(this).parents(".item-detail").attr("data-item-id");
    strageControl(item_id, "cart");
    //  console.log(item_id);
   
    if( storageSaveJudge(item_id,'cart')){
       doneFlash('カートに追加しました');
      

    }else{
       doneFlash('カートから外しました');
    
    }
  
  });

  const fav_storage = JSON.parse(localStorage.getItem("ninco_fav"));
 
  if(   fav_storage  !== null){
     
  const fav_items = item_data.filter(function(item){
      
      if(fav_storage.indexOf(item['id']) !== -1){
          return item;
      }
  });
  
  $('[data-item-list="fav"]').append(createDom(fav_items));
  const fav_slide_count = $(window).width() >= 768 ? 5:3;

    if(fav_items.length > fav_slide_count){
        $('[data-item-list="fav"]').slick({
            autoplay: true,
            arrows: true,
            dots: false,
            speed: 1500,
            easing: "swing",
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<div class="slide-btn prev-btn">',
            nextArrow: '<div class="slide-btn next-btn">',
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  centerPadding: "0%",
                  slidesToScroll: 1,
                },
              },
            ],
          });
    }
}

//お気に入りスライダー





  if (page_type == "page-index") {
    let item_list_new = getItemList("new");
    $('[data-item-list="new"]').append(createDom(item_list_new));
    category.forEach(function (category) {
      let item_list_category = getItemList("category", category);

      item_list_category = createDom(item_list_category);
      $(`[data-item-list="${category}"]`).append(item_list_category);
    });
  }

  if (page_type == "page-detail") {
    const item_detail = getItemSingle();
    const storage_types = ['cart','fav'];
  
    Object.keys(item_detail).forEach(function (key) {
      $(`[data-item-parts="${key}"]`).text(item_detail[key]);
    });
    $("#zoom-img").attr("src", `./img/item/${item_detail["id"]}.png`);
    $("#zoom-img").attr(
      "data-zoom-image",
      `./img/item/${item_detail["id"]}_l.png`
    );

    $(".item-detail").attr("data-item-id", item_detail["id"]);

    //console.log(id_num);
    $("[data-zoom-image]").elevateZoom();
    if (!item_detail["new"]) {
      $(".new-label").remove();
    }
    
    storage_types.forEach(function(type){
        if(storageSaveJudge(item_detail['id'],type))
        $(`.btn--${type}`).addClass('is-storage');

    })



  }
  if (page_type == "page-list") {
    const item_list = createDom(getItemList(param_key));
    $(".sort-list").append(item_list);
    $(".price-select").on("change", function () {
      $("#price-form").submit();
    });
  }
});

$(window).on("scroll", function () {
  //コロリン
  if ($(window).scrollTop() > 300) {
    $(".circle-baner").addClass("is-over");
  } else {
    $(".circle-baner").removeClass("is-over");
  }
  if ($(window).scrollTop() > $(".footer").offset().top - 1000) {
    $(".circle-baner").removeClass("is-over");
  }
  //ファイドイン

  $('[data-fadeIn]').each(function (index, el) {
    if ($(window).scrollTop() > ( $(el).offset().top - $(window).height() / 2) ) {
      $(el).addClass("is-over");
    }
  });
});

$(window).on("load", function () {
  // ローダー
  setTimeout(function () {
    $(".loader").fadeOut();
  },600);
});
