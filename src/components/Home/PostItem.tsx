import { PostCard } from "./PostCard";

interface Prop {
  item: any;
  profile?: boolean;
  bookmark?: boolean;
  comment?: boolean;
  userId: string;
}

export const PostItem = ({
  item,
  profile,
  bookmark,
  comment,
  userId,
}: Prop) => {
  const alreadyLiked = item.likedUsers? item.likedUsers?.includes(userId) : false;
  return (
    <PostCard
      id={item.id}
      avatar={
        item.user?.userImage || "https://robohash.org/stevejobs?bgset=bg2"
      }
      userName={item.user?.fullName}
      userHandle={item.user?.userName}
      desc={item.content}
      likedUsers={item.likedUsers}
      commentCount={item.commentCount}
      timestamp={item.createdAt}
      alreadyLiked={alreadyLiked}
      profile={profile}
      bookmark={bookmark}
      comment={comment}
      userId={userId}
    ></PostCard>
  );
};
