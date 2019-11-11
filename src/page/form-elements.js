import "../style/main.scss";
import Inputmask from "inputmask";

Inputmask({ mask: "99.99.9999", placeholder: "ДД.ММ.ГГГГ" }).mask(
  "#maskedTextField"
);
