import React, {
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createAdmin,
} from "../../../api/adminApi";


const AddAdmin = () => {


  const navigate =
    useNavigate();


  const [loading, setLoading] =
    useState(false);


  const [form, setForm] =
    useState({

      name: "",

      email: "",

      phone: "",

      password: "",

      role: "ADMIN",

    });


  const change = (
    e
  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };


  const submit =
    async (e) => {


      e.preventDefault();


      if (

        !form.name ||

        !form.email ||

        !form.password

      ) {

        alert(
          "Name, email and password are required."
        );

        return;

      }


      try {


        setLoading(true);


        await createAdmin(
          form
        );


        alert(
          "Admin created successfully!"
        );


        navigate(
          "/admin/admins"
        );


      } catch (error) {


        console.error(
          error
        );


        alert(

          error?.response
            ?.data
            ?.message

            ||

          "Unable to create admin"

        );


      } finally {


        setLoading(false);

      }

    };


  return (

    <div className="max-w-xl space-y-6">


      <button

        onClick={() =>
          navigate(-1)
        }

        className="
          flex
          gap-2
          items-center
          text-gray-400
        "

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

        className="
          bg-[#151515]
          border
          border-white/10
          rounded-2xl
          p-6
          space-y-5
        "

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


        <Input

          label="Password"

          name="password"

          type="password"

          value={form.password}

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

            className="
              mt-2
              w-full
              bg-black
              border
              border-white/10
              rounded-xl
              px-4
              py-3
            "

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

          disabled={loading}

          className="
            w-full
            bg-red-600
            py-3
            rounded-xl
            font-semibold
            disabled:opacity-50
          "

        >

          {loading

            ? "Creating..."

            : "Create Admin"

          }

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

      className="
        mt-2
        w-full
        bg-black
        border
        border-white/10
        rounded-xl
        px-4
        py-3
        outline-none
        focus:border-red-500
      "

    />

  </div>

);


export default AddAdmin;