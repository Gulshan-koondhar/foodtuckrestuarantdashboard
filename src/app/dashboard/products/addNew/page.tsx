"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

const AddProductPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [available, setAvailable] = useState(true);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState(""); // New field for description
  const [tags, setTags] = useState<string[]>([]); // New field for tags

  // Handle image upload to Sanity
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagList = value.split(",").map((tag) => tag.trim()); // Convert comma-separated tags into an array
    setTags(tagList);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      return;
    }

    try {
      const imageAsset = await client.assets.upload("image", image, {
        filename: image.name,
      });

      // Create a new product document
      const newProduct = {
        _type: "food",
        name,
        price,
        originalPrice,
        category,
        available,
        slug: {
          _type: "slug",
          current: slug,
        },
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        description, // Adding description
        tags, // Adding tags
      };

      // Insert new product into Sanity
      await client.create(newProduct);
      alert("Product added successfully!");

      // Redirect to a page (you can change the path as needed)
      router.push("/dashboard/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="text-lg font-semibold">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#182237] p-2 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="text-lg font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full bg-[#182237] p-2 rounded-md"
            required
          />
        </div>

        {/* Original Price */}
        <div>
          <label htmlFor="originalPrice" className="text-lg font-semibold">
            Original Price
          </label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
            className="w-full bg-[#182237] p-2 rounded-md"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="text-lg font-semibold">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#182237] p-2 rounded-md"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="text-lg font-semibold">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full bg-[#182237] p-2 rounded-md"
            accept="image/*"
            required
          />
        </div>

        {/* Availability */}
        <div>
          <label className="text-lg font-semibold">Available</label>
          <select
            value={available ? "true" : "false"}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="w-full bg-[#182237] p-2 rounded-md"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="text-lg font-semibold">
            Slug (URL)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-[#182237] p-2 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="text-lg font-semibold">
            Product Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#182237] p-2 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="text-lg font-semibold">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags.join(", ")} // Display tags as comma separated
            onChange={handleTagsChange}
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md w-full"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
