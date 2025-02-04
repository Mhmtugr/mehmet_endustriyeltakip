import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Typography, Box, Paper, Divider, Chip, List, ListItem, ListItemText } from "@mui/material";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!order) {
    return <Typography>Yükleniyor...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Sipariş Detayları</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6">Sipariş Bilgileri</Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Ürün Tipi" secondary={order.product_type} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Miktar" secondary={order.quantity} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Tahmini Teslim" secondary={order.delivery_date} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sipariş Notları" secondary={order.notes} />
          </ListItem>
        </List>
        <Typography variant="h6" sx={{ mt: 2 }}>Teknik Özellikler</Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Kesici Motor Bobin" secondary={order.breaker_motor} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Ayırıcı Motor Bobin" secondary={order.separator_motor} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Röle Tipi" secondary={order.relay_type} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Gerilim Gösterge Tipi" secondary={order.voltage_indicator} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default OrderDetails;
