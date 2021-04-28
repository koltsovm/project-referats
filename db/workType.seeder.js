const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');
const WorkType = require('../models/workType.model');

dbConnect();

const seeder = async () => {
  console.log('Seeder started');
  const workTypes = [
    {
      title: 'Диплом',
    },
    {
      title: 'Курсовая',
    },
    {
      title: 'Реферат',
    },
    {
      title: 'Контрольная',
    },
    {
      title: 'Тест',
    },
    {
      title: 'Чертеж',
    },
    {
      title: 'Отчет по практике',
    },
    {
      title: 'Эссе',
    },
    {
      title: 'Перевод',
    },
    {
      title: 'Сочинение',
    },
    {
      title: 'Магистерская диссертация',
    },
    {
      title: 'Кандидатская диссертация',
    },
    {
      title: 'Бизнес-план',
    },
    {
      title: 'Рецензия',
    },
    {
      title: 'Другое',
    },
  ];

  await WorkType.insertMany(workTypes);
  mongoose.disconnect();
  console.log('Seeder finshed');
};

seeder();
