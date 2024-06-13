"use client";

import { useState, useEffect } from "react";
import useUserData from "@/hook/useUser";
import PaymentModal from "@/app/cart/payment";

// Define prices for different options
const prices: any = {
  flavor: { Vanilla: 100, Chocolate: 120, "Red Velvet": 130, Marble: 140 },
  weight: { 0.5: 1000, 1: 2000, 1.5: 3000, 2: 4000, 2.5: 5000, 3: 6000 },
  topping: {
    "Buttercream Frosting": 100,
    "Chocolate Ganache": 150,
    "Cream Cheese Frosting": 120,
    "Whipped Cream Frosting": 130,
    "Coconut Enveloping": 140,
    Fondant: 160,
  },
  decoration: {
    "Fresh Fruit": 200,
    Flowers: 250,
    Sprinkles: 50,
    "Chocolate Shavings": 180,
    Cookies: 220,
    Candies: 100,
    None: 0,
  },
};

const provinces = [
  "Western",
  "Central",
  "Eastern",
  "North Central",
  "Northern",
  "North Western",
  "Sabaragamuwa",
  "Southern",
  "Uva",
];

export default function CustomCakePage() {
  const user = useUserData();

  const [formData, setFormData] = useState({
    user: user.id,
    image: "",
    category: "Birthday",
    flavor: "Vanilla",
    topping: "Buttercream Frosting",
    topper: "",
    decoration: "Fresh Fruit",
    weight: 1,
    message: "",
    extraDetails: "",
    deliveryDate: "",
    prefferedContact: "email",
    glutenFree: false,
    vegan: false,
    nutFree: false,
    price: 0,
  });
  const [price, setPrice] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const [address, setAddress] = useState("");
  const [province, setSelectedProvince] = useState("");

  useEffect(() => {
    calculatePrice();
  }, [formData.flavor, formData.weight, formData.topping, formData.decoration]);

  useEffect(() => {
    setAddress(user.address);
    setSelectedProvince(user.province);
  }, [user.address, user.province]);

  const calculatePrice = () => {
    const flavorPrice = prices.flavor[formData.flavor];
    const weightPrice = prices.weight[formData.weight];
    const toppingPrice = prices.topping[formData.topping];
    const decorationPrice = prices.decoration[formData.decoration];
    const totalPrice =
      flavorPrice + weightPrice + toppingPrice + decorationPrice;
    setPrice(totalPrice);
    setFormData((prevData) => ({ ...prevData, price: totalPrice }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = event.target as any;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: valueToUse }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSimilarImage = (imageUrl: string) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
    setImagePreview(imageUrl);
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.category) errors.category = "Category is required.";
    if (!formData.flavor) errors.flavor = "Flavor is required.";
    if (!formData.topping) errors.topping = "Topping is required.";
    if (!formData.decoration) errors.decoration = "Decoration is required.";
    if (!formData.message) errors.message = "Message is required.";
    if (!formData.deliveryDate)
      errors.deliveryDate = "Delivery date is required.";
    if (!formData.image) errors.image = "Image is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!user) {
      alert("Please log in to customize your cake.");
      return;
    }
    if (!validateForm()) return;

    fetch("http://localhost:5000/v1/api/customcakes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, user: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          console.log("Success:", data);
          alert("Your request has been submitted successfully.");
          setFormData({
            user: user.id,
            image: "",
            category: "Birthday",
            flavor: "Vanilla",
            topping: "Buttercream Frosting",
            topper: "",
            decoration: "Fresh Fruit",
            weight: 1,
            message: "",
            extraDetails: "",
            deliveryDate: "",
            prefferedContact: "email",
            glutenFree: false,
            vegan: false,
            nutFree: false,
            price: 0,
          });
          setImagePreview(null);

          //redirect to success page
          window.location.href = "/customized-cakes";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting your request.");
      });
  };

  if (!user) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Please log in to customize your cake.
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customize Your Cake
        </h1>
        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Valentine">Valentine</option>
              <option value="Farewell">Farewell</option>
              <option value="Graduation">Graduation</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Engagement">Engagement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="flavor"
              className="block text-sm font-medium text-gray-700"
            >
              Flavor
            </label>
            <select
              id="flavor"
              name="flavor"
              value={formData.flavor}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="Vanilla">Vanilla</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Red Velvet">Red Velvet</option>
              <option value="Marble">Marble</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="topping"
              className="block text-sm font-medium text-gray-700"
            >
              Topping
            </label>
            <select
              id="topping"
              name="topping"
              value={formData.topping}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="Buttercream Frosting">Buttercream Frosting</option>
              <option value="Chocolate Ganache">Chocolate Ganache</option>
              <option value="Cream Cheese Frosting">
                Cream Cheese Frosting
              </option>
              <option value="Whipped Cream Frosting">
                Whipped Cream Frosting
              </option>
              <option value="Coconut Enveloping">Coconut Enveloping</option>
              <option value="Fondant">Fondant</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="topper"
              className="block text-sm font-medium text-gray-700"
            >
              Topper (Optional)
            </label>
            <select
              id="topper"
              name="topper"
              value={formData.topper}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="">None</option>
              <option value="Happy Birthday">Happy Birthday</option>
              <option value="Mr & Mrs">Mr & Mrs</option>
              <option value="Happy Anniversary">Happy Anniversary</option>
              <option value="Happy Mothers Day">Happy Mothers Day</option>
              <option value="Happy Fathers Day">Happy Fathers Day</option>
              <option value="Congratulations">Congratulations</option>
              <option value="Welcome Baby">Welcome Baby</option>
              <option value="Engaged">Engaged</option>
              <option value="Love">Love</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="decoration"
              className="block text-sm font-medium text-gray-700"
            >
              Decoration
            </label>
            <select
              id="decoration"
              name="decoration"
              value={formData.decoration}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="Fresh Fruit">Fresh Fruit</option>
              <option value="Flowers">Flowers</option>
              <option value="Sprinkles">Sprinkles</option>
              <option value="Chocolate Shavings">Chocolate Shavings</option>
              <option value="Cookies">Cookies</option>
              <option value="Candies">Candies</option>
              <option value="None">None</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <select
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value={0.5}>0.5 kg</option>
              <option value={1}>1 kg</option>
              <option value={1.5}>1.5 kg</option>
              <option value={2}>2 kg</option>
              <option value={2.5}>2.5 kg</option>
              <option value={3}>3 kg</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="extraDetails"
              className="block text-sm font-medium text-gray-700"
            >
              Extra Details (Optional)
            </label>
            <textarea
              id="extraDetails"
              name="extraDetails"
              value={formData.extraDetails}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Date
            </label>
            <input
              id="deliveryDate"
              name="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="prefferedContact"
              className="block text-sm font-medium text-gray-700"
            >
              Preferred Contact
            </label>
            <select
              id="prefferedContact"
              name="prefferedContact"
              value={formData.prefferedContact}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="glutenFree"
              name="glutenFree"
              type="checkbox"
              checked={formData.glutenFree}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
            />
            <label
              htmlFor="glutenFree"
              className="ml-2 block text-sm text-gray-900"
            >
              Gluten Free
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="vegan"
              name="vegan"
              type="checkbox"
              checked={formData.vegan}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
            />
            <label htmlFor="vegan" className="ml-2 block text-sm text-gray-900">
              Vegan
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="nutFree"
              name="nutFree"
              type="checkbox"
              checked={formData.nutFree}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
            />
            <label
              htmlFor="nutFree"
              className="ml-2 block text-sm text-gray-900"
            >
              Nut Free
            </label>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Cake Preview"
                className="mt-4 w-full h-full object-cover rounded-md shadow-sm"
              />
            )}
            {similarImages.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Similar cakes designs from Zee Cakes
                </h2>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {similarImages.map((image, index) => (
                    <img
                      key={index}
                      src={`/dataset/${image}`}
                      alt={`Similar Image ${index + 1}`}
                      className="w-full h-auto rounded-md shadow-sm cursor-pointer"
                      onClick={() => {
                        handleSelectSimilarImage(`/dataset/${image}`);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Price: LKR {price.toFixed(2)}
          </div>

          <div className="mt-4">
            <p className="text-sm font-bold text-gray-700">Delivery Address:</p>
            <div className="flex justify-between items-center gap-2 mt-2">
              <input
                id="address"
                type="text"
                placeholder="Address"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                disabled
              />
              <select
                id="province"
                value={province}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-slate-100 block w-1/2 p-2 text-base border-gray-700 sm:text-sm rounded-md"
                disabled
              >
                <option value="">Select a province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (validateForm()) {
                  setPaymentModalOpen(true);
                } else {
                  alert("Please fill in all the required fields.");
                }
              }}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Purchase Cake
            </button>
          </div>
        </form>
        {Object.keys(formErrors).length > 0 && (
          <div className="mt-4 text-red-500">
            <ul>
              {Object.entries(formErrors).map(([key, error]) => (
                <li key={key}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentSuccess={() => {
          handleSubmit();
          setPaymentModalOpen(false);
        }}
        totalPrice={price}
      />
    </div>
  );
}
