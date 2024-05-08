import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RestaurantPage = () => {
  return (
    <>
      {/*Hero section start*/}
      <header className="dark:bg-gray-900">
        <div className="container px-4 py-16 mx-auto pt-0 pb-0 pr-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="col-span-1">
              <div className="max-w-lg mx-auto pt-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white text-center lg:text-left">Savor the Flavors, Reserve Your Table, <br />Order Your <span className="text-green-600">Delights</span></h1>
                <p className="mt-6 text-gray-600 dark:text-gray-400 text-center lg:text-left">Are you craving an exquisite dining experience? Look no further! The Villa Hotel invites you to indulge in a culinary journey like no other. From mouthwatering cuisines to impeccable service, we ensure every visit is a delight for your senses.</p>
                <button className="w-full px-5 py-2 mt-8 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-600 rounded-lg lg:w-auto hover:bg-green-500 focus:outline-none focus:bg-green-500"><a href="#TableReserveForm">Book Now</a></button>
              </div>
            </div>
            <div className="col-span-1 pr-0">
              <div className="flex justify-center items-center h-full">
                <img className="w-full max-w-full h-auto md:h-full object-cover md:object-right-top pr-0" src="/images/img_24.jpg" alt="food" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*Hero section end*/}

      {/*Form section start*/}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex items-center justify-center" id="TableReserveForm">
        <div className="grid md:grid-cols-1 items-center gap-6 w-3/4">
          <div className="relative">
            <div className="flex flex-col border rounded-3xl p-4 sm:p-6 lg:p-10 dark:border-neutral-700 bg-gray-300 shadow-xl md:shadow-2xl lg:shadow-3xl">
              <div className="flex items-center justify-center pb-3">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-neutral-200">Savor Every Bite: Reserve Your Table</h2>
              </div>
              {/*Form*/}
              <form className="mt-6">
                <div className="grid gap-4 lg:gap-6">
                  {/*Form inputs start*/}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label htmlFor="hs-firstname-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">First Name</label>
                      <input type="text" name="hs-firstname-hire-us-1" id="hs-firstname-hire-us-1" className="py-3 px-4 block w-full border-green-600 rounded-3xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                    </div>
                    <div>
                      <label htmlFor="hs-lastname-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Last Name</label>
                      <input type="text" name="hs-lastname-hire-us-1" id="hs-lastname-hire-us-1" className="py-3 px-4 block w-full border-gray-200 rounded-3xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label htmlFor="hs-work-email-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Email</label>
                      <input type="email" name="hs-work-email-hire-us-1" id="hs-work-email-hire-us-1" autoComplete="email" className="py-3 px-4 block w-full border-gray-200 rounded-3xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                    </div>
                    <div>
                      <label htmlFor="hs-contact-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Contact Number</label>
                      <input type="text" name="hs-contact-hire-us-1" id="hs-contact-hire-us-1" className="py-3 px-4 block w-full border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label htmlFor="hs-contact-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Select the Date</label>
                      <input type="date" name="hs-contact-hire-us-1" id="hs-contact-hire-us-1" className="py-3 px-4 block w-full border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                    </div>
                    <div>
                      <label htmlFor="hs-company-website-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Select the time</label>
                      <input type="time" name="hs-company-website-hire-us-1" id="hs-company-website-hire-us-1" className="py-3 px-4 block w-full border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                    </div>
                  </div>
                  {/*Form inputs end*/}

                  {/*Table selections start*/}
                  <label className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Pick a Table</label>


                  <div className="grid sm:grid-cols-5 gap-6">
                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">1</span>
                    </label>

                    <label htmlFor="hs-checkbox-checked-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-checked-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">2</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">3</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">4</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">5</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">6</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">7</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">8</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">9</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">10</span>
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-5 gap-6">
                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">11</span>
                    </label>

                    <label htmlFor="hs-checkbox-checked-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-checked-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">12</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">13</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">14</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">15</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">16</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">17</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">18</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">19</span>
                    </label>

                    <label htmlFor="hs-checkbox-in-form" className="flex p-3 w-full bg-white border border-gray-200 rounded-3xl text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                      <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-in-form" />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">20</span>
                    </label>
                  </div>
                  {/*Table selection end*/}
                  <div className="flex items-center justify-center">
                    <label className="block mb-2 text-2xl text-gray-700 font-medium dark:text-white">Menu</label>
                  </div>

                  {/*Menu*/}
                  <Carousel>
                    <CarouselContent>

                      {/*Menu items*/}
                      <CarouselItem className="basis-1/3">
                        <div className="overflow-hidden rounded-3xl bg-white text-slate-500 shadow-md shadow-slate-200">
                          {/* <!-- Image --> */}
                          <figure>
                            <img
                              src="https://picsum.photos/id/493/800/600"
                              alt="card image"
                              className="aspect-video w-full"
                            />
                          </figure>
                          {/* <!-- Body--> */}
                          <div className="p-6">
                            <header className="mb-4">
                              <h3 className="text-xl font-medium text-slate-700">
                                Greek Yoghurt with Strawberries
                              </h3>
                              <p className="text-slate-400"> $8.99</p>
                            </header>
                            <p>
                              Savor the perfect blend of creamy and fruity with our Strawberry Greek Yogurt. Indulge in velvety Greek yogurt topped with luscious, ripe strawberries for a delightful burst of flavor in every spoonful.
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300 p-3">Select Quantity</label>

                            <input type="number" className="block p-3 mt-2 w-1/3 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                          </div>
                          {/* <!-- Action base sized basic button --> */}
                          <div className="flex items-center justify-center">
                            <label htmlFor="hs-checkbox-checked-in-form" className="flex items-center justify-center p-3 w-full bg-white  rounded-lg text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                              <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-checked-in-form" />
                              <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Place an order</span>
                            </label>
                          </div>
                        </div>
                      </CarouselItem>

                      {/*Menu items*/}
                      <CarouselItem className="basis-1/3">
                        <div className="overflow-hidden rounded-3xl bg-white text-slate-500 shadow-md shadow-slate-200">
                          {/* <!-- Image --> */}
                          <figure>
                            <img
                              src="/images/img_25.jpg"
                              alt="card image"
                              className="aspect-video w-full"
                            />
                          </figure>
                          {/* <!-- Body--> */}
                          <div className="p-6">
                            <header className="mb-4">
                              <h3 className="text-xl font-medium text-slate-700">
                                Tomato and Ham Pizza
                              </h3>
                              <p className="text-slate-400"> $7.99</p>
                            </header>
                            <p>
                              Satisfy your cravings with our Tomato & Ham Pizza. Featuring a crispy crust topped with tangy tomato sauce and savory slices of ham, it's a classic combination that never disappoints. Dive into the perfect blend of flavors with every cheesy bite!
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300 p-3">Select Quantity</label>

                            <input type="number" className="block p-3 mt-2 w-1/3 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                          </div>
                          {/* <!-- Action base sized basic button --> */}
                          <div className="flex items-center justify-center">
                            <label htmlFor="hs-checkbox-checked-in-form" className="flex items-center justify-center p-3 w-full bg-white  rounded-lg text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                              <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-checked-in-form" />
                              <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Place an order</span>
                            </label>
                          </div>

                        </div>
                      </CarouselItem>

                      {/*Menu items*/}
                      <CarouselItem className="basis-1/3">
                        <div className="overflow-hidden rounded-3xl bg-white text-slate-500 shadow-md shadow-slate-200">
                          {/* <!-- Image --> */}
                          <figure>
                            <img
                              src="/images/img_26.jpg"
                              alt="card image"
                              className="aspect-video w-full"
                            />
                          </figure>
                          {/* <!-- Body--> */}
                          <div className="p-6">
                            <header className="mb-4">
                              <h3 className="text-xl font-medium text-slate-700">
                                Noodle with Steak
                              </h3>
                              <p className="text-slate-400"> $12.00</p>
                            </header>
                            <p>
                              Savor the best of both worlds with our Steak & Noodle Fusion. Juicy steak slices meet tender noodles in a tantalizing dance of flavors. Experience the perfect balance of savory and hearty in every bite!
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300 p-3">Select Quantity</label>

                            <input type="number" className="block p-3 mt-2 w-1/3 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                          </div>
                          {/* <!-- Action base sized basic button --> */}
                          <div className="flex items-center justify-center">
                            <label htmlFor="hs-checkbox-checked-in-form" className="flex items-center justify-center p-3 w-full bg-white  rounded-lg text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                              <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-checked-in-form" />
                              <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Place an order</span>
                            </label>
                          </div>
                        </div>
                      </CarouselItem>

                      {/*Menu items*/}
                      <CarouselItem className="basis-1/3">
                        <div className="overflow-hidden rounded-3xl bg-white text-slate-500 shadow-md shadow-slate-200">
                          {/* <!-- Image --> */}
                          <figure>
                            <img
                              src="/images/img_27.jpg"
                              alt="card image"
                              className="aspect-video w-full"
                            />
                          </figure>
                          {/* <!-- Body--> */}
                          <div className="p-6">
                            <header className="mb-4">
                              <h3 className="text-xl font-medium text-slate-700">
                                Deep Fried Rice
                              </h3>
                              <p className="text-slate-400"> $10.99</p>
                            </header>
                            <p>
                              Savor the essence of the sea with our Seafood Delight Rice. Succulent shrimp, tender crab meat, and fresh calamari tossed with fragrant jasmine rice and fried to perfection. A symphony of flavors in every bite!
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300 p-3">Select Quantity</label>

                            <input type="number" className="block p-3 mt-2 w-1/3 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                          </div>
                          {/* <!-- Action base sized basic button --> */}
                          <div className="flex items-center justify-center">
                            <label htmlFor="hs-checkbox-checked-in-form" className="flex items-center justify-center p-3 w-full bg-white  rounded-lg text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                              <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-green-500 dark:checked:border-green-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-checked-in-form" />
                              <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Place an order</span>
                            </label>
                          </div>
                        </div>
                      </CarouselItem>

                      {/* Repeat CarouselItem for other items */}

                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  {/*Special requirement textarea*/}
                  <div>
                    <label htmlFor="hs-work-email-hire-us-1" className="block mb-2 text-lg text-gray-700 font-medium dark:text-white">Put your special requirements</label>
                    <textarea placeholder="Type here..." className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-3xl border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
                  </div>

                  {/*Confirmation button*/}
                  <div className="flex items-center justify-center">
                    <button className="inline-flex items-center justify-center w-60 h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full shadow-lg focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-md focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                      <span>Confirm Reservation</span>
                    </button>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
