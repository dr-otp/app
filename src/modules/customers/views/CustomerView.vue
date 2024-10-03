<script lang="ts" src="./CustomerView.ts" />

<template>
  <section class="flex justify-center" v-if="customer">
    <CustomCard class="lg:w-3/4 xl:w-2/3 sm:w-full" :deleted="customer.deletedAt">
      <template #title>
        <section class="flex gap-2">
          <h2 class="text-2xl font-semibold flex items-center flex-wrap gap-2">
            <Button
              v-tooltip.top="'Regresar'"
              @click="$router.push({ name: 'home.customers' })"
              :icon="icons.ANGLE_LEFT"
              icon-class="text-3xl"
              text
              rounded
            />
            <span>Cliente</span>
            <Tag rounded>
              <template #default>
                <span class="text-2xl"># {{ customer.code }}</span>
              </template>
            </Tag>
            <Tag v-if="customer.deletedAt" severity="danger"> Eliminado </Tag>
          </h2>
        </section>
      </template>
      <template #content>
        <form @submit="onSubmit" class="flex flex-col gap-6" v-focustrap>
          <!-- Code -->

          <CustomInputText
            id="name"
            label="Nombre"
            v-model="name"
            v-bind="nameAttrs"
            :error="errors.name"
            autofocus
          />

          <!-- Email -->
          <CustomInputText
            id="email"
            label="Email"
            v-model="email"
            v-bind="emailAttrs"
            :error="errors.email"
            autofocus
          />

          <!-- Meta Data (Read-only) -->
          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Fieldset legend="Creado Por" v-if="customer.createdBy">
              <p class="m-0">
                <span class="flex items-center text-muted-color">
                  <i :class="icons.USER"></i>
                  <span class="ml-2">@{{ customer.createdBy?.username }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.ENVELOPE"></i>
                  <span class="ml-2">{{ customer.createdBy?.email }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.CALENDAR"></i>
                  <span class="ml-2">{{ Formatter.getDate(customer.createdAt) }}</span>
                </span>
              </p>
            </Fieldset>

            <Fieldset legend="Actualizado Por" v-if="customer.updatedBy">
              <span class="flex items-center text-muted-color">
                <i :class="icons.USER"></i>
                <span class="ml-2">@{{ customer.updatedBy?.username }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.ENVELOPE"></i>
                <span class="ml-2">{{ customer.updatedBy?.email }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.CALENDAR"></i>
                <span class="ml-2">{{ Formatter.getDate(customer.updatedAt) }}</span>
              </span>
            </Fieldset>

            <Fieldset legend="Eliminado Por" v-if="customer.deletedBy">
              <span class="flex items-center text-muted-color">
                <i :class="icons.USER"></i>
                <span class="ml-2">@{{ customer.deletedBy?.username }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.ENVELOPE"></i>
                <span class="ml-2">{{ customer.deletedBy?.email }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.CALENDAR"></i>
                <span class="ml-2">{{ Formatter.getDate(customer.deletedAt) }}</span>
              </span>
            </Fieldset>
          </section>

          <!-- Submit Button -->
          <div class="flex flex-row-reverse flex-wrap gap-2">
            <CustomButton
              type="submit"
              label="Guardar cambios"
              :disabled="(!meta.dirty && meta.valid) || isPending"
              :loading="isPending"
            />
            <CustomButton v-if="customer.deletedAt" label="Restaurar" severity="info" />
          </div>
        </form>
      </template>
    </CustomCard>
  </section>
</template>

<style scoped></style>
