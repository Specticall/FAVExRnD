import { useMutation } from "react-query";
import { API_URL } from "../Services/config";
import axios, { AxiosError } from "axios";
import { TCategory } from "../Context/DashboardContext";
import { useEffect, useState } from "react";
import { usePopup } from "../Context/PopupContext";
import Spinner from "./Spinner";
import { useAuth } from "../Context/AuthContext";

type TGetCategorySuccessResponse = {
  status: number;
  data: {
    categories: TCategory[];
  };
};
type TModifyCategorySuccessResponse = {
  status: number;
  data: {
    category: TCategory;
  };
};

const onMutationError = (error: AxiosError) => {
  console.log(error);
};

export default function CategoryModal() {
  const { notify } = usePopup();
  const { AUTH_HEADER } = useAuth();

  const getCategory = () => axios.get(`${API_URL}/api/categories`);

  const createCategory = (category: { label: string }) =>
    axios.post(`${API_URL}/api/categories`, category, AUTH_HEADER);
  const deleteCategory = (id: number) =>
    axios.delete(`${API_URL}/api/categories/${id}`, AUTH_HEADER);

  const [isGettingDeletedId, setIsGettingDeleteId] = useState(0);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const getAction = useMutation(getCategory, {
    onSuccess(data) {
      const categoriesResponse = (data.data as TGetCategorySuccessResponse).data
        .categories;
      setCategories(categoriesResponse);
    },
    onError: onMutationError,
  });

  const postAction = useMutation(createCategory, {
    onSuccess(data) {
      const postedCategory = (data.data as TModifyCategorySuccessResponse).data
        .category;
      setCategories((current) => [...current, postedCategory]);
      setTextInputValue("");
      notify("Category Successfully Added");
    },
    onError: onMutationError,
  });

  const deleteAction = useMutation(deleteCategory, {
    onSuccess() {
      getAction.mutate();
      notify("Category Succesfully Deleted");
    },
    onError: onMutationError,
  });

  const [textInputValue, setTextInputValue] = useState("");

  useEffect(() => {
    getAction.mutate();
  }, []);

  const handleSubmit = () => {
    postAction.mutate({ label: textInputValue });
  };

  const handleDelete = (id: number) => {
    deleteAction.mutate(id);
    setIsGettingDeleteId(id);
  };

  return (
    <article className="bg-[#FFFCFA] p-12 font-body w-full max-w-[30rem] rounded-lg">
      <h3 className="text-title font-semibold text-main mb-8">Category</h3>
      <form className="w-full mb-6" onSubmit={handleSubmit}>
        <label className="text-small text-light">Category Name</label>
        <div className="grid grid-cols-[1fr_6rem] gap-3 mt-3 w-full">
          <input
            type="text"
            onChange={(e) => setTextInputValue(e.target.value)}
            placeholder="Your Category"
            value={textInputValue}
            className="text-small bg-transparent placeholder:text-light/50 border-[1px] border-main rounded-md py-2 px-4 flex-1"
          />
          <button
            className="px-6 py-2 bg-main flex justify-center items-center rounded-md text-body hover:bg-light"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {postAction.isLoading ? <Spinner /> : "+ Add"}
          </button>
        </div>
      </form>
      <p className="text-light text-small mb-4">Existing Category</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {categories?.map((category) => {
          return (
            <li className="flex-1 flex justify-between items-center bg-main text-body rounded-lg px-4 py-2 whitespace-nowrap gap-4 max-w-fit hover:bg-light cursor-pointer">
              {deleteAction.isLoading && isGettingDeletedId === category.id ? (
                <Spinner />
              ) : (
                <>
                  <p>{category.label}</p>
                  <i
                    className="bx bx-x text-medium hover:text-white"
                    onClick={() => handleDelete(category.id)}
                  ></i>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
