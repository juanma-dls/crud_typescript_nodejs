import { request } from "express";
import { getCustomRepository } from "typeorm";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/OrderRepository";

interface IOrder {
  id?:number
  numOrder: string,
  description: string,
  deliveryAddres
  dateOrder: Date,
  product_id: string,
  applicant_id: string
};

class OrderService {
  async create({ numOrder, description, deliveryAddres, dateOrder,product_id, applicant_id }: IOrder) {
    if ( !numOrder || !description || !description || !dateOrder || !product_id || !applicant_id ) {
      throw new Error("Por favor complete todos los campos");
    };

    const orderRepository = getCustomRepository(OrderRepository);
   
    const order = orderRepository.create({ 
      numOrder,
      description,
      deliveryAddres, 
      dateOrder,
      product_id, 
      applicant_id 
    })

    await orderRepository.save(order);
    console.log(order)

    return order;

  };

  async delete(id: string) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where("id = :id", { id })
      .execute();

    return order;
  };

  async getData(id: string) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findOne(id);

    return order;
  };

  async list() {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.find({relations:["product", "applicant"]});   

    return order;
  };

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    };

    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository
      .createQueryBuilder()
      .where("numOrder like :search", { search: `%${search}%` })
      .orWhere("description like :search", { search: `%${search}%` })
      .orWhere("deliveryAddres like :search", { search: `%${search}%` })
      .orWhere("product_id like :search", { search: `%${search}%` })
      .orWhere("applicant_id like :search", { search: `%${search}%` })
      .getMany();

    return order;

  };

  async update({ id, numOrder, description, deliveryAddres,  product_id, applicant_id }: IOrder) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository
      .createQueryBuilder()
      .update(Order)
      .set({ numOrder, description, deliveryAddres, product_id, applicant_id })
      .where("id = :id", { id })
      .execute();

    return order;

  };

}
export const orderRepository = new OrderService()
export default OrderService ;