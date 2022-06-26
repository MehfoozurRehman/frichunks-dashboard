import React, { useState, useEffect } from "react";
import TableEntryHeadings from "../Components/TableEntryHeadings";
import DeleteConfirmation from "./DeleteConfirmation";
import { parseDate } from "../utils/parseDate";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";

export default function Orders({
  isAdd,
  isEdit,
  setIsEdit,
  setIsAdd,
  setEditId,
}) {
  const navigate = useNavigate();
  const [BlogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState("");

  useEffect(() => {
    axios
      .get(`https://dsmeglobal-api.herokuapp.com/api/v1/get_blog`)
      .then((res) => {
        setBlogData(res.data);
        setLoading(false);
      });
  }, [!isAdd, !isEdit, !deleteConfirmation]);

  const tableHeadingRow = [
    { heading: "" },
    { heading: "User" },
    { heading: "Date" },
    { heading: "Status" },
    { heading: "Address" },
  ];

  return (
    <>
      <div className="main__container">
        <div className="main__container__header">
          <div className="main__container__header__heading">Orders</div>
          <div className="main__container__header__buttons">
            <button
              onClick={() => {
                setIsAdd(true);
              }}
              className="primary__button"
            >
              Add
            </button>
          </div>
        </div>
        <div className="main__container__content">
          <div className="main__container__content__table">
            <TableEntryHeadings tableHeadingEntryRow={tableHeadingRow} />
            {loading ? (
              <Loader />
            ) : (
              <>
                {BlogData.length > 0 ? (
                  BlogData.map((item, i) => (
                    <div className="entry__info__row" key={i}>
                      <div className="entry__info__row__btns">
                        <button
                          onClick={() => {
                            navigate("/dashboard/order-details");
                          }}
                          className="primary__button__rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-eye"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setEditId({
                              _id: item._id,
                              title: item.title,
                              image: item.image,
                              categories: item.categories,
                              author: item.author,
                              content: item.content,
                            });
                          }}
                          className="primary__button__rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit-2"
                          >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirmation(true);
                            setDeleteConfirmationId(item._id);
                          }}
                          className="secondary__button__rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                      <div className="entry__info__row__text">{item.title}</div>
                      <div className="entry__info__row__text">
                        {parseDate(item.updatedAt)}
                      </div>
                      <div className="entry__info__row__text">
                        {item.author}
                      </div>
                      {item.categories.length < 40 ? (
                        <div className="entry__info__row__text">
                          {item.categories.map(
                            (category) => category.label + ", "
                          )}
                        </div>
                      ) : (
                        <div className="entry__info__row__text">
                          <a>
                            Categories
                            <div className="entry__info__row__text__message">
                              {item.categories.map((category, i) =>
                                i < item.categories.length
                                  ? category.label + ", "
                                  : category.label
                              )}
                            </div>
                          </a>
                        </div>
                      )}
                      <div className="entry__info__row__text">
                        <img
                          src={
                            "https://res.cloudinary.com/mehfoozurrehman/image/upload/" +
                            item.image
                          }
                          alt="tableEntryPic"
                          className="entry__info__row__text__img"
                        />
                      </div>
                      {/* <div className="entry__info__row__text">{item.title}</div>
                      
                      
                      <div className="entry__info__row__text">
                        {item.isOur.map((item) => item.label)}
                      </div>
                      <div className="entry__info__row__text">{item.url}</div> */}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No Data yet
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {deleteConfirmation ? (
        <DeleteConfirmation
          closeOnClick={setDeleteConfirmation}
          deleteConfirmationURL="delete_blog"
          deleteConfirmationId={deleteConfirmationId}
          fetch={() => {
            setLoading(true);
            axios
              .get(`https://dsmeglobal-api.herokuapp.com/api/v1/get_blog`)
              .then((res) => {
                setBlogData(res.data);
                setLoading(false);
              });
          }}
        />
      ) : null}
    </>
  );
}
