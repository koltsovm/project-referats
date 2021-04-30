const { disconnect } = require('mongoose');
const dbConnect = require('./dbConnect');
const Category = require('../models/category.model');

dbConnect();

// засеиваем базу категорий
async function seeder() {
  await dbConnect;

  const allCategoris = [];

  allCategoris.push(new Category({ title: 'Английский язык' }));
  allCategoris.push(new Category({ title: 'Банковское дело' }));
  allCategoris.push(new Category({ title: 'Высшая математика' }));
  allCategoris.push(new Category({ title: 'География' }));
  allCategoris.push(new Category({ title: 'Естествознание' }));
  allCategoris.push(new Category({ title: 'Математика' }));
  allCategoris.push(new Category({ title: 'Информатика' }));
  allCategoris.push(new Category({ title: 'Информационные технологии' }));
  allCategoris.push(new Category({ title: 'История' }));
  allCategoris.push(new Category({ title: 'Литература' }));
  allCategoris.push(new Category({ title: 'Логика' }));
  allCategoris.push(new Category({ title: 'Механика' }));
  allCategoris.push(new Category({ title: 'Немецкий язык' }));
  allCategoris.push(new Category({ title: 'Педагогика' }));
  allCategoris.push(new Category({ title: 'Политология' }));
  allCategoris.push(new Category({ title: 'Правоведение' }));
  allCategoris.push(new Category({ title: 'Психология' }));
  allCategoris.push(new Category({ title: 'Русский язык' }));
  allCategoris.push(new Category({ title: 'Социология' }));
  allCategoris.push(new Category({ title: 'Статистика' }));
  allCategoris.push(new Category({ title: 'Право' }));
  allCategoris.push(new Category({ title: 'Физика' }));
  allCategoris.push(new Category({ title: 'Философия' }));
  allCategoris.push(new Category({ title: 'Химия' }));
  allCategoris.push(new Category({ title: 'Черчение' }));
  allCategoris.push(new Category({ title: 'Экология' }));
  allCategoris.push(new Category({ title: 'Экономика' }));
  allCategoris.push(new Category({ title: 'Юриспруденция' }));
  allCategoris.push(new Category({ title: 'Другое' }));
  await Category.deleteMany();
  await Category.insertMany(allCategoris);
  await disconnect();
}

seeder();
