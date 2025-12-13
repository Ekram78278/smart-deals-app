import { use, useEffect, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";


useEffect(()=>{
    fetch(``)
    .then
},[productId])



const ProductDetails = () => {
  const { _id, product, productId } = useLoaderData();
  console.log(product);
  const { user } = use(AuthContext);
  console.log(user);
  const bidModalRef = useRef(null);
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(productId, name, email, bid);
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing bid", data);
        if(data.insertedId){
            bidModalRef.current.close();
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your bid has been placed",
  showConfirmButton: false,
  timer: 1500
});
        }
      });
  };

  return (
    <div>
      {/* product info */}
      <div></div>
      <div>
        <button onClick={handleBidModalOpen} className="btn btn-primary">
          {" "}
          I want to buy this product
        </button>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the Best Offer!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  readOnly
                  defaultValue={user?.displayName}
                  className="input"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  readOnly
                  defaultValue={user?.email}
                  name="email"
                />
                {/* bid amount */}
                <label className="label">Bid</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Bid"
                  name="bid"
                />
                <button className="btn btn-neutral mt-4">Place Your Bid</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* {bids for this product} */}
      <div>

      </div>
    </div>
  );
};

export default ProductDetails;
