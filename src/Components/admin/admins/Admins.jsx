import React, {
  useEffect,
  useState,
} from "react";


import {

  ShieldCheck,

  Plus,

  Trash2,

} from "lucide-react";


import {
  useNavigate,
} from "react-router-dom";


import {

  getAdmins,

  deleteAdmin,

} from "../../../api/adminApi";


const Admins = () => {


  const navigate =
    useNavigate();


  const [admins, setAdmins] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // LOAD ADMINS
  // ==========================================

  const loadAdmins =
    async () => {


      try {


        setLoading(true);


        const data =
          await getAdmins();


        setAdmins(data);


      } catch (error) {


        console.error(

          "Unable to load admins:",

          error

        );


        setAdmins([]);


      } finally {


        setLoading(false);

      }

    };


  useEffect(() => {

    loadAdmins();

  }, []);


  // ==========================================
  // DELETE ADMIN
  // ==========================================

  const removeAdmin =
    async (id, role) => {


      if (

        role === "SUPER_ADMIN"

      ) {

        alert(
          "Super Admin cannot be deleted."
        );

        return;

      }


      if (

        !window.confirm(
          "Remove this admin?"
        )

      ) {

        return;

      }


      try {


        await deleteAdmin(id);


        setAdmins(

          admins.filter(

            (admin) =>
              admin.id !== id

          )

        );


        alert(
          "Admin removed successfully."
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

          "Unable to delete admin"

        );

      }

    };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="text-center py-20 text-gray-500">

        Loading admins...

      </div>

    );

  }


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        justify-between
        gap-4
      ">


        <div>

          <h1 className="text-3xl font-bold">

            Admin Management

          </h1>


          <p className="text-gray-500 mt-1">

            Manage DrinkIt administrators.

          </p>

        </div>


        <button

          onClick={() =>

            navigate(
              "/admin/admins/add"
            )

          }

          className="
            bg-red-600
            px-5
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
          "

        >

          <Plus size={18} />

          Add Admin

        </button>


      </div>


      {/* ADMINS */}

      <div className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
      ">


        {admins.map(

          (admin) => (

            <div

              key={admin.id}

              className="
                bg-[#151515]
                border
                border-white/10
                rounded-2xl
                p-5
              "

            >


              <div className="
                flex
                items-center
                gap-4
              ">


                <div className="
                  w-12
                  h-12
                  rounded-xl
                  bg-red-500/10
                  flex
                  items-center
                  justify-center
                ">

                  <ShieldCheck

                    className="
                      text-red-500
                    "

                    size={22}

                  />

                </div>


                <div>

                  <h3 className="font-semibold">

                    {admin.name}

                  </h3>


                  <p className="
                    text-xs
                    text-gray-500
                  ">

                    {admin.email}

                  </p>

                </div>


              </div>


              <div className="
                mt-5
                flex
                items-center
                justify-between
              ">


                <span className="
                  px-3
                  py-1
                  rounded-full
                  bg-white/5
                  text-xs
                ">

                  {admin.role}

                </span>


                {admin.role !==
                  "SUPER_ADMIN" && (

                  <button

                    onClick={() =>

                      removeAdmin(

                        admin.id,

                        admin.role

                      )

                    }

                    className="
                      p-2
                      rounded-lg
                      bg-red-500/10
                      text-red-400
                    "

                  >

                    <Trash2 size={17} />

                  </button>

                )}


              </div>


            </div>

          )

        )}


      </div>


      {/* EMPTY STATE */}

      {!loading &&

        admins.length === 0 && (

          <div className="
            text-center
            py-16
            text-gray-500
          ">

            No admins found.

          </div>

        )}


    </div>

  );

};


export default Admins;