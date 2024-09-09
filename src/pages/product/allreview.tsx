import ReviewSection from "@/components/productDetails/ReviewSection";
// import { useRouter } from "next/router";
import React from "react";
function allreview() {
  //   const [review, setReview] = useState([]);
  //   const router = useRouter();
  //   let id = router.query.id;
  //   useEffect(() => {
  //     // console.log(id,"allreview");
  //     getReviewData();
  //   }, [id]);
  //   const getReviewData = async () => {
  //     axios
  //       .get("https://dummyjson.com/comments")
  //       .then((res) => {
  //         setReview(res.data.comments);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  return (
    <div>
      <ReviewSection id="" />
    </div>
  );
}

export default allreview;
