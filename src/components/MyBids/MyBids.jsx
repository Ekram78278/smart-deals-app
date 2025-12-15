import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("bids data are", data);
          setBids(data);
        })
        .catch(error => {
          console.error('Error fetching bids:', error);
        });
    }
  }, [user?.email]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              const remainingBids = bids.filter(bid => bid._id !== _id);
              setBids(remainingBids);

              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been removed.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete bid. It may not exist.",
                icon: "error",
              });
            }
          })
          .catch(error => {
            console.error('Delete error:', error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bids.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <p className="text-gray-500">No bids found. Start bidding on products!</p>
                </td>
              </tr>
            ) : (
              bids.map((bid, index) => {
                return (
                  <tr key={bid._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={bid.buyer_image || "https://via.placeholder.com/150"}
                              alt={bid.buyer_name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">{bid.buyer_email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Product ID: {bid.product}
                    </td>
                    <td>{bid.bid_price}</td>
                    <td>
                      {bid.status === "pending" ? (
                        <div className="badge badge-warning">{bid.status}</div>
                      ) : (
                        <div className="badge badge-success">{bid.status}</div>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleDeleteBid(bid._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        Remove Bid
                      </button>
                    </th>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
