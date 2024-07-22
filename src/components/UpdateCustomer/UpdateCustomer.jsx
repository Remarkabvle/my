import "./UpdateCustomer.scss";

import React, { useEffect } from "react";

import { useUpdateCustomerMutation } from "../../context/api/customersApi";

const UpdateCustomer = ({ update, setUpdate }) => {
  const [SingleUpdate, { data: single, isSuccess, isLoading, error }] =
    useUpdateCustomerMutation();

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateSingle = {
      fname: update.fname,
      lname: update.lname,
      phone_primary: update.phone_primary,
      address: update.address,
    };

    SingleUpdate({ id: update._id, body: updateSingle });
  };

  useEffect(() => {
    if (isSuccess) {
      setUpdate((prev) => !prev);
    }
  }, [isSuccess, setUpdate]);

  return (
    <form onSubmit={handleUpdate} className="update__form">
      <label htmlFor="fname">Name</label>
      <input
        id="fname"
        value={update?.fname}
        onChange={(e) =>
          setUpdate((prev) => ({
            ...prev,
            fname: e.target.value,
          }))
        }
        placeholder="fname"
        type="text"
      />
      <label htmlFor="lname">Surname</label>
      <input
        id="lname"
        value={update?.lname}
        onChange={(e) =>
          setUpdate((prev) => ({
            ...prev,
            lname: e.target.value,
          }))
        }
        placeholder="lname"
        type="text"
      />
      <label htmlFor="phone_primary">Phone Number</label>
      <input
        id="phone_primary"
        onChange={(e) =>
          setUpdate((prev) => ({
            ...prev,
            phone_primary: e.target.value,
          }))
        }
        value={update?.phone_primary}
        placeholder="phone_primary"
        type="text"
      />
      <label htmlFor="address">Address</label>
      <input
        id="address"
        value={update?.address}
        onChange={(e) =>
          setUpdate((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
        placeholder="address"
        type="text"
      />
      <button type="submit">{isLoading ? "Saving..." : "Save"}</button>
      {error && <div className="error">Xatolik yuz berdi: {error.message}</div>}
    </form>
  );
};

export default UpdateCustomer;
