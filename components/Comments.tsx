import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";
import { client } from "../utils/client";
import { BASE_URL } from "../utils";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();
  const [data, setData] = React.useState<any>(comments);

  let deleteComment = async (key: any, id: any) => {
    setData(data.filter((x: IComment) => x._key !== key));
    // client
    //   .delete({query: `*[_type == 'post'][0...20].${id}`})
    //   .then(console.log)
    //   .catch(console.error);

    // client
    //   .patch(id)
    //   .unset([`comments[_key==${key}]`])
    //   .commit().then((data) =>{
    //     console.log('work',data)
    //   }).catch((err) =>{
    //     console.log('errr',err)
    //   });
   


    console.log(id, key);
  };

  console.log(data);

  return (
    <div className="border-t-2 border-gray-200  flex flex-col lg:h-[240px] pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px] ">
        {data?.length > 0 ? (
          data?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=" p-2 items-center" key={idx}>
                      <div className="flex items-start gap-3 ">
                        <Link href={`/profile/${user._id}`}>
                          <>
                            <div className="w-12 h-12">
                              <Image
                                width={48}
                                height={48}
                                className="rounded-full cursor-pointer"
                                src={user.image}
                                alt="user-profile"
                                layout="responsive"
                              />
                            </div>

                            <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                              {user.userName}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>
                          </>
                        </Link>
                        <div className="flex justify-end lg:w-[48%] w-[20%] md:w-[100%] cursor-pointer">
                          <AiOutlineDelete
                            onClick={() => deleteComment(item._key, user._id)}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No Comments Yet! Be First to do add the comment." />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0  pb-6 px-2 md:px-10 items-center justify-center w-full">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-2 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button className="text-md text-gray-400 " onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
