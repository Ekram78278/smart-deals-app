import { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetails = () => {
  const { _id, product, productId } = useLoaderData();
  const [bids, setBids] = useState([]);
  console.log(product);
  const { user } = use(AuthContext);
  console.log(user);

  useEffect(() => {
    fetch(`http://localhost:3000/product/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids of this product", data);
        setBids(data);
      });
  }, [productId]);

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
      buyer_image: user?.photoURL,
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
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
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
        <h3 className="text-3xl">
          {" "}
          Bids for this product:{" "}
          <span className="text-primary">{bids.length}</span>{" "}
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  SL No.
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
             {
               bids.map((bid,index) => 
                 <tr>
                <th>
                {index}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
               ) 
             }
            
              
            </tbody>
            {/* foot */}
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
