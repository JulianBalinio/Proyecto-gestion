import React from "react";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import {
  RemoveCircleOutline,
  AddCircleOutlineOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import styles from "./index.module.scss";
import Heading from "/src/components/Heading";

export default function ActualOrder({ order, setOrder, handleClick }) {
  const getTotal = (order) => {
    return order.reduce((acc, prod) => prod.price * prod.quantity + acc, 0).toFixed(2)
  }

  return (
    <>
      <header className={styles.header}>
        <Heading title={"Pedido Actual"} />
        <Divider></Divider>
      </header>

      <article className={styles.cardContainer}>
        {order.map((producto, key) => (
          <Card key={key} className={styles.card}>
            <CardContent>
              <header className={styles.header}>
                <Typography variant="h6" fontWeight={600}>
                  {producto.name}
                </Typography>
                <Button
                  sx={{ minWidth: 20 }}
                  endIcon={<CloseOutlined />}
                  onClick={() =>
                    setOrder((prev) =>
                      prev.filter((prod) => prod.id !== producto.id)
                    )
                  }
                ></Button>
              </header>

              <Typography>Unidad: ${producto.price}</Typography>
            </CardContent>

            <CardActions className={styles.footer}>
              <section>
                <Button
                  sx={{ minWidth: 20 }}
                  startIcon={<RemoveCircleOutline />}
                  classes={{ endIcon: styles.endIcon }}
                  onClick={() =>
                    setOrder((prev) =>
                      prev.map((prod) =>
                        prod.id === producto.id
                          ? {
                            ...prod,
                            quantity: Math.max(1, prod.quantity - 1),
                          }
                          : prod
                      )
                    )
                  }
                ></Button>

                <TextField
                  sx={{ width: "100px" }}
                  label={"Cantidad"}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={producto.quantity}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (!isNaN(newValue)) {
                      setOrder((prev) =>
                        prev.map((prod) =>
                          prod.id === producto.id
                            ? {
                              ...prod,
                              quantity: Math.max(0, newValue),
                            }
                            : prod
                        )
                      );
                    }
                  }}
                ></TextField>

                <Button
                  sx={{ minWidth: 20 }}
                  endIcon={<AddCircleOutlineOutlined />}
                  onClick={() =>
                    setOrder((prev) =>
                      prev.map((prod) =>
                        prod.id === producto.id
                          ? {
                            ...prod,
                            quantity: Math.max(1, prod.quantity + 1),
                          }
                          : prod
                      )
                    )
                  }
                ></Button>
              </section>

              <Typography variant="h6" fontWeight={600}>
                ${(producto.price * producto.quantity).toFixed(2)}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </article>

      <footer className={styles.containerFooter}>
        <Divider></Divider>
        <section>
          <Button variant={"contained"} onClick={handleClick}>
            CONFIRMAR PEDIDO
          </Button>

          <article>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h5">${getTotal(order)}</Typography>
          </article>
        </section>
      </footer>
    </>
  );
}
