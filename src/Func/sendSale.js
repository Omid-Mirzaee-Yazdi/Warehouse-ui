const fetchProduct = async (id) => {
  const result = await fetch(`http://localhost:7000/products/${id}`, {
    methos: "GET",
  })
    .then(async (res) => {
      if (res.status !== 200) {
        return { error: true };
      } else {
        const jres = await res.json();
        return jres;
      }
    })
    .catch((a) => {
      return { error: true };
    });
  return result;
};
const submitsale = async (id, quantity) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
      amountSold: quantity,
    }),
  };
  const result = await fetch(`http://localhost:7000/sales/`, requestOptions)
    .then(async (res) => {
      if (res.status === 503) {
        return { error: true };
      } else {
        const jres = await res.json();
        return jres;
      }
    })
    .catch((a) => {
      return { error: true };
    });
  return result;
};
const subTractFromStock = async (id, quantity) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amountToSubtract: quantity,
    }),
  };
  const result = await fetch(
    `http://localhost:7000/articles/${id}`,
    requestOptions
  )
    .then(async (res) => {
      if (res.status === 503) {
        return { error: true };
      } else {
        const jres = await res.json();
        return jres;
      }
    })
    .catch((a) => {
      return { error: true };
    });
  return result;
};

export const sendSale = async (productId, quantity) => {
  let product = await fetchProduct(productId);
  do {
    product = await fetchProduct(productId);
  } while (product.error);
  let resSale = { error: true };
  do {
    resSale = await submitsale(product.id, quantity);
  } while (resSale.error);

  await product.articles.forEach(async (article) => {
    let res = { error: true };
    do {
      res = await subTractFromStock(
        article.id,
        quantity * article.amountRequired
      );
    } while (res.error);
  });

  return { set: true };
};
