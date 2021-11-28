import MainTemplate from "../template/MainTemplate";
import {
  Breadcrumbs,
  Typography,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect } from "react";
import {
  findLike,
  persist,
  findByKey,
  findByAttribute,
  deleteByKey,
} from "../service/utils";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import SearchBar from "../components/SearchBar";
import LoadingButton from "../components/LoadingButton";
import HeadInfo from "../components/HeadInfo";
import FormDialog from "../components/FormDialog";
import { collections } from "../service/collections";

export default function Items() {
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length) fetchQty();
  }, [items]);

  function fetchItems() {
    findLike(collections.items, "name", search).then((data) => {
      setItems(data);
      setInventory(data);
    });
  }

  async function fetchQty() {
    const dataWithQtyPromises = items.map(async (item) => {
      let qty = 0;
      await findByAttribute(collections.posting, "itemId", "==", item.id).then(
        (postings) => {
          qty += postings.reduce(
            (acc, post) =>
              acc +
              (post.operation == "Entrada"
                ? post.quantity
                : post.quantity * -1),
            0
          );
        }
      );
      item.quantity = qty;
      return item;
    });
    const dataWithQty = await Promise.all(dataWithQtyPromises);
    // Força a mudança de referência dos objetos
    setInventory(JSON.parse(JSON.stringify(dataWithQty)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchItems();
  }

  return (
    <MainTemplate>
      <HeadInfo>
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          <Typography color="text.primary">Itens</Typography>
        </Breadcrumbs>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={handleSubmit}
        />
      </HeadInfo>
      <DataGrid
        columns={columns}
        autoHeight={true}
        rows={inventory}
        onRowClick={() => {}}
      />
    </MainTemplate>
  );
}

const columns = [
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "quantity",
    headerName: "Quantidade",
    valueFormatter: (params) => {
      const qty = params.row?.quantity;
      return qty ? qty.toString().replace(".", ",") : "Carregando...";
    },
    flex: 0.5,
    minWidth: 150,
  },
];
