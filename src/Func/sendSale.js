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
const substractfromstock = async (id, quantity) => {
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

export const sendSale = async (productid, quantity) => {
  let product = await fetchProduct(productid);
  do {
    product = await fetchProduct(productid);
  } while (product.error);
  let ressale = { error: true };
  do {
    ressale = await submitsale(product.id, quantity);
  } while (ressale.error);

  await product.articles.forEach(async (article) => {
    let res = { error: true };
    do {
      res = await substractfromstock(
        article.id,
        quantity * article.amountRequired
      );
    } while (res.error);
  });

  return { set: true };
};
