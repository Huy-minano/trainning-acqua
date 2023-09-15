<template>
  <div>
    <h1>Select Mountains</h1>
    <MultiSelectMountains
      :modelValue="mountain"
      @update:modelValue="(newValue) => (mountain = newValue)"
    />
  </div>
</template>

<script>
import MultiSelectMountains from "../components/MultiSelectMountains.vue";

export default {
  layout: "custom",
  components: { MultiSelectMountains },
  data() {
    return {
      mountain: {
        title: "Aconcagua",
        description:
          "Aconcagua is a mountain in the Principal Cordillera of the Andes mountain range, in Mendoza Province, Argentina. It is the highest mountain in the Americas and the highest outside of Asia, being the highest in both the Southern and Western Hemispheres with a summit elevation of 6,960.8 metres.",
        height: "6,962 m",
        countries: ["Argentina"],
        continent: "South America",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aconcagua2016.jpg/600px-Aconcagua2016.jpg",
        dir: "/mountains",
        path: "/mountains/aconcagua",
        slug: "aconcagua",
        updatedAt: "2020-12-11T15:40:35.000Z",
      },
    };
  },
};
</script>
