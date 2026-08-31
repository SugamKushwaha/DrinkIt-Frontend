import React, {
  useEffect,
  useState,
} from "react";

import {
  Truck,
  Search,
  Eye,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getDeliveryPartners,
} from "../../../api/adminApi";


const DeliveryPartners = () => {

  const navigate = useNavigate();

  const [partners, setPartners] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================
  // LOAD DELIVERY PARTNERS
  // ==========================================

  const loadPartners =
    async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getDeliveryPartners();

        console.log(
          "Delivery Partners:",
          response
        );

        setPartners(
          response || []
        );

      } catch (err) {

        console.error(
          "Unable to load delivery partners:",
          err
        );

        setError(
          "Unable to load delivery partners."
        );

      } finally {

        setLoading(false);

      }
    };


  useEffect(() => {

    loadPartners();

  }, []);


  // ==========================================
  // FILTER
  // ==========================================

  const filtered =
    partners.filter((partner) => {

      const value =
        search.toLowerCase();

      return (

        partner.name
          ?.toLowerCase()
          .includes(value)

        ||

        partner.email
          ?.toLowerCase()
          .includes(value)

        ||

        partner.phone
          ?.toLowerCase()
          .includes(value)

        ||

        partner.vehicleNumber
          ?.toLowerCase()
          .includes(value)

      );

    });


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">

          Delivery Partners

        </h1>

        <p className="text-gray-500 mt-1">

          Manage active delivery partners.

        </p>

      </div>


      {/* SEARCH */}

      <div
        className="
          bg-[#151515]
          border
          border-white/10
          rounded-2xl
          p-4
        "
      >

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="
              Search delivery partners...
            "

            className="
              w-full
              bg-black
              border
              border-white/10
              rounded-xl
              py-3
              pl-11
              pr-4
              outline-none
              focus:border-red-500
            "

          />

        </div>

      </div>


      {/* ERROR */}

      {error && (

        <div
          className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            rounded-xl
            p-4
          "
        >

          {error}

        </div>

      )}


      {/* LOADING */}

      {loading && (

        <div
          className="
            bg-[#151515]
            border
            border-white/10
            rounded-2xl
            p-12
            text-center
            text-gray-500
          "
        >

          Loading delivery partners...

        </div>

      )}


      {/* TABLE */}

      {!loading && (

        <div
          className="
            bg-[#151515]
            border
            border-white/10
            rounded-2xl
            overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                min-w-[850px]
              "
            >

              <thead
                className="
                  bg-white/5
                "
              >

                <tr
                  className="
                    text-left
                    text-sm
                    text-gray-400
                  "
                >

                  <th className="p-4">
                    Partner
                  </th>

                  <th className="p-4">
                    Phone
                  </th>

                  <th className="p-4">
                    Vehicle
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filtered.map(
                  (partner) => (

                    <tr

                      key={partner.id}

                      className="
                        border-t
                        border-white/5
                      "

                    >

                      {/* PARTNER */}

                      <td className="p-4">

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              w-10
                              h-10
                              rounded-xl
                              bg-blue-500/10
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <Truck

                              size={18}

                              className="
                                text-blue-400
                              "

                            />

                          </div>


                          <div>

                            <p
                              className="
                                font-medium
                              "
                            >

                              {partner.name || "-"}

                            </p>


                            <p
                              className="
                                text-xs
                                text-gray-500
                              "
                            >

                              {partner.email || "-"}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* PHONE */}

                      <td className="p-4">

                        {partner.phone || "-"}

                      </td>


                      {/* VEHICLE */}

                      <td className="p-4">

                        {partner.vehicleType || "-"}

                        {" "}

                        {partner.vehicleNumber || ""}
                        

                      </td>


                      {/* STATUS */}

                      <td className="p-4">

                        <span

                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs

                            ${
                              partner.status ===
                              "ACTIVE"

                                ? `
                                  bg-green-500/10
                                  text-green-400
                                `

                                : `
                                  bg-red-500/10
                                  text-red-400
                                `
                            }
                          `}

                        >

                          {partner.status}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="p-4">

                        <button

                          onClick={() =>
                            navigate(
                              `/admin/delivery-partners/${partner.id}`
                            )
                          }

                          className="
                            p-2
                            rounded-lg
                            bg-white/5
                            hover:bg-white/10
                          "

                        >

                          <Eye size={17} />

                        </button>

                      </td>

                    </tr>

                  )
                )}


                {/* EMPTY */}

                {filtered.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="
                        p-10
                        text-center
                        text-gray-500
                      "
                    >

                      No delivery partners found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );

};


export default DeliveryPartners;