import { firestore } from "@/utils/firebase";

export async function animeDataAPI() {
  try {
    const dataCollection = firestore.collection('anime-data');
    const datasSnapshot = await dataCollection.get();
    const datas = datasSnapshot.docs.map((data) => ({
      id: data.id,
      ...data.data(),
    }));

    return datas;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export async function amvAPI() {
  try {
    const dataCollection = firestore.collection('amv-data');
    const datasSnapshot = await dataCollection.get();
    const datas = datasSnapshot.docs.map((data) => ({
      id: data.id,
      ...data.data(),
    }));

    return datas;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
