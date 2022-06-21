export function buildNftView(product) {
  const type = product.isSell ? 'venta' : 'compra'
  if (product.image == undefined) {
    product.image = 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png'
  }
  return `
  <a href="/productDetail.html?id=${product.id}">
    <div class="product">
      <img src="${product.image}" alt="product image">
      <div>
        <span class="title">${product.title}</span>
        <span class="price"> - ${product.price}</span>
      </div>
      <p class="description">${product.description}</p>
      <span class="type ${type}">${type}</span>
    </div>
  </a>
  `
}

export function buildNotFoundProductsView() {
  return `
    <h1>No hay productos disponibles, inténtalo de nuevo más tarde.<h1>
  `
}

export function buildNftDetailView(nft) {
  const currentTime = new Date(nft.date).toLocaleString()
  if (nft.image == undefined) {
    nft.image = 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png'
  }
  let nftTemplate = `
  
  <div class="">
    <div class="detailTopContent">
      <div class="detailImgContainer">
        <div>
          <div class="topBar">
            <div class="topBarContent">
              <i class="fas fa-snowflake"></i>
              <div class="likesCounter">
                <i class="far fa-heart"> ${nft.likes}</i>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <img src="${'./public/img/' + nft.image}" alt="" class="rounded-b-lg border-[#151c22] border"/>
          </div>
        </div>
      </div>
      <div class="detailsContainer">
        <div class="generalWrapper">
          <div class="generalInfoContainer">
            <div class="accent">Team ${nft.username}</div>
            <div class="generalNftTitle">${nft.name} # ${nft.id}</div>
            <div class="otherInfo">
              <div class="ownedBy">
                Owned by <span class="accent"># ${nft.username}</span>
              </div>
              <div class="generalLikes">
                <i class="fas fa-heart generalLikeIcon"> ${nft.likes} </i>
              </div>
            </div>
          </div>
          <div class="actionButtonsContainer">
            <div class="generalActionButtons">
              <div class="generalActionButton">
                <i class="fas fa-redo"></i>
              </div>
              <div class="generalDivider"></div>
              <div class="generalActionButton">
                <i class="fas fa-external-link-alt"></i>
              </div>
              <div class="generalDivider"></div>
              <div class="generalActionButton">
                <i class="fas fa-share-alt"></i>
              </div>
              <div class="generalDivider"></div>
              <div class="generalActionButton">
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activityWrapper">
      <div class="activityTitle">
        <div class="activityTitleLeft">
          <span class="activityTitleIcon">
            <i class="fas fa-sort-alt"></i>
          </span>
          Item Activity
        </div>
        <div class="activityTitleRight">
          <i class="fas fa-angle-down"></i>
        </div>
      </div>
      <div class="activityTable">
        <div class="activityFilter">
          <div class="filterTitle">Filter</div>
          <div class="activityTitleIcon">
            <i class="fas fa-angle-down"></i>
          </div>
        </div>
        <div class="tableHeader">
          <div class="tableHeaderElement flex-[3]">Event</div>
          <div class="tableHeaderElement flex-[3]">Price</div>
          <div class="tableHeaderElement flex-[3]">From</div>
          <div class="tableHeaderElement flex-[3]">To</div>
          <div class="tableHeaderElement flex-[3]">Date</div>
        </div>
        <div class="eventItem">
          <div class="event flex-[3]">
            <div class="eventIcon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="eventName">${nft.detail}</div>
          </div>
          <div class="eventPrice flex-[3]">
            <img src="./assets/eth.png" alt="eth" class="eventEthLogo"/>
            <div class="eventPriceValue">${nft.price}</div>
          </div>
          <div class="accent flex-[3]">emer88</div>
          <div class="accent flex-[3]">KC</div>
          <div class="accent flex-[3]">${currentTime}</div>
        </div>
      </div>
    </div>
  </div>
  
  `

  return nftTemplate
}
export function buildProductDetailView(product) {
  const type = product.isSell ? 'Compra' : 'Venta';
  if (product.image == undefined) {
    product.image = 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png'
  }
  return `
  <div class="product-detail">
    <img src="${product.image}" alt="product image" class="img-fluid">
    <span class="type">${type}</span>
    <div>
      <span class="title">${product.title}</span>
      <span class="description"> - ${product.price}</span>
    </div>
    <p class="description">${product.description}</p>
    <p class="date">fecha actualización: ${product.updatedAt.toLocaleString()}</p>
  </div>
  `
}

export function buildNftListSpinnerView() {
  return `
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  `
}

export function buildNotFoundNftsView() {
  return `
    <h1 class="text-white">Ooops!!! there is no Nft!!! =(</h1>
  `
}
