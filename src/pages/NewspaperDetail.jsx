import { useParams } from "react-router-dom";
import "./NewspaperDetail.css";

const newspapers = [
  {
    id: 1,
    title: "天★Que新聞 創刊号",
    image: "/images/tenkyupaper1.jpeg",
    date: "2026年3月16日",
    sevenEleven: "21591244",
    lawson: "97UGQXPKBM",
    printSetting: "長辺とじ・両面印刷",
    deadline: "2026年8月26日",
  },

  {
    id: 2,
    title: "天★Que新聞 02",
    image: "/images/tenkyupaper2.jpeg",
    date: "2026年6月18日",
    sevenEleven: "86077473",
    lawson: "97UGQXPKBM",
    printSetting: "長辺とじ・両面印刷",
    deadline: "2026年8月26日",
  },
];


function NewspaperDetail() {
  const { id } = useParams();

  const newspaper = newspapers.find(
    (item) => item.id === Number(id)
  );

  if (!newspaper) {
    return <h1>新聞が見つかりません。</h1>;
  }

  return (
    <div className="newspaper-detail">

      <div className="newspaper-detail-image">
        <img
          src={newspaper.image}
          alt={newspaper.title}
        />
      </div>

      <div className="newspaper-detail-info">

        <h1>{newspaper.title}</h1>

        <div className="newspaper-info-block">

          <h2>発行日</h2>
          <p>{newspaper.date}</p>

        </div>

        <div className="newspaper-info-block">

          <h2>セブンイレブン</h2>
          <p>{newspaper.sevenEleven}</p>

        </div>

        <div className="newspaper-info-block">

          <h2>ローソン</h2>
          <p>{newspaper.lawson}</p>

        </div>

        <div className="newspaper-info-block">

          <h2>印刷設定</h2>
          <p>{newspaper.printSetting}</p>

        </div>

        <div className="newspaper-info-block">

          <h2>発行期限</h2>
          <p>{newspaper.deadline}</p>

        </div>

      </div>

    </div>
  );
}

export default NewspaperDetail;


