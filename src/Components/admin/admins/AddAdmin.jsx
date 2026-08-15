import React, { useState } from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  addAdmin,
} from "../../../utils/adminStorage";

const AddAdmin = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "ADMIN",
  });

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const submit = (e) => {

    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and email are required.");
      return;
    }

    addAdmin(form);

    navigate("/admin/admins");
  };

  return (
    <div className="max-w-xl space-y-6">

      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 items-center text-gray-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div>

        <h1 className="text-3xl font-bold">
          Add Admin
        </h1>

        <p className="text-gray-500 mt-1">
          Create a new administrator.
        </p>

      </div>

      <form
        onSubmit={submit}
        className="bg-[#151515] border border-white/10 rounded-2xl p-6 space-y-5"
      >

        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={change}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={change}
        />

        <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={change}
        />

        <div>

          <label className="text-sm text-gray-400">
            Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={change}
            className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          >

            <option value="ADMIN">
              Admin
            </option>

            <option value="PRODUCT_ADMIN">
              Product Admin
            </option>

            <option value="PARTNER_ADMIN">
              Partner Admin
            </option>

          </select>

        </div>

        <button
          className="w-full bg-red-600 py-3 rounded-xl font-semibold"
        >
          Create Admin
        </button>

      </form>

    </div>
  );
};

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => (
  <div>

    <label className="text-sm text-gray-400">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
    />

  </div>
);

export default AddAdmin;