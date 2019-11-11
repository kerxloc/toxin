import "./style/main.scss";
import Inputmask from "inputmask";

Inputmask({ mask: "99.99.9999", placeholder: "ДД.ММ.ГГГГ" }).mask(
  "#maskedTextField"
);
Inputmask({ mask: "99.99.9999", placeholder: "ДД.ММ.ГГГГ" }).mask(
  "#arrival-input"
);
Inputmask({ mask: "99.99.9999", placeholder: "19.08.2019" }).mask(
  "#departure-input"
);
