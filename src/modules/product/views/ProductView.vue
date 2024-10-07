<script lang="ts" src="./ProductView.ts" />

<template>
  <section class="flex justify-center" v-if="product">
    <BaseCard class="w-full max-w-[50rem]" :deleted="!!product.deletedAt">
      <template #title>
        <section class="flex gap-2">
          <h2 class="text-2xl font-semibold flex items-center flex-wrap gap-2 flex-1">
            <Button
              v-tooltip.top="'Regresar'"
              @click="$router.push({ name: 'product.list' })"
              :icon="icons.ANGLE_LEFT"
              icon-class="text-3xl"
              text
              rounded
            />
            <span>Producto</span>
            <Tag rounded>
              <template #default>
                <span class="text-2xl"># {{ product.code }}</span>
              </template>
            </Tag>
            <Tag v-if="!!product.deletedAt" severity="danger">Eliminado</Tag>
          </h2>
          <MenuPopup
            :is-deleted="!!product?.deletedAt"
            @on:new="$router.replace({ name: 'home.product', params: { productCode: 'nuevo' } })"
            @on:delete="() => onDeleteRestore(product?.id, !!product?.deletedAt)"
          />
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

          <CustomInputNumber
            id="price"
            label="Precio Q."
            v-model="price"
            v-bind="priceAttrs"
            :error="errors.price"
          />

          <!-- Meta Data (Read-only) -->
          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Fieldset legend="Creado Por" v-if="product.createdBy">
              <p class="m-0">
                <span class="flex items-center text-muted-color">
                  <i :class="icons.USER"></i>
                  <span class="ml-2">@{{ product.createdBy?.username }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.ENVELOPE"></i>
                  <span class="ml-2">{{ product.createdBy?.email }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.CALENDAR"></i>
                  <span class="ml-2">{{ Formatter.getDate(product.createdAt) }}</span>
                </span>
              </p>
            </Fieldset>

            <Fieldset legend="Actualizado Por" v-if="product.updatedBy">
              <span class="flex items-center text-muted-color">
                <i :class="icons.USER"></i>
                <span class="ml-2">@{{ product.updatedBy?.username }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.ENVELOPE"></i>
                <span class="ml-2">{{ product.updatedBy?.email }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.CALENDAR"></i>
                <span class="ml-2">{{ Formatter.getDate(product.updatedAt) }}</span>
              </span>
            </Fieldset>

            <Fieldset legend="Eliminado Por" v-if="product.deletedBy">
              <span class="flex items-center text-muted-color">
                <i :class="icons.USER"></i>
                <span class="ml-2">@{{ product.deletedBy?.username }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.ENVELOPE"></i>
                <span class="ml-2">{{ product.deletedBy?.email }}</span>
              </span>
              <span class="flex items-center text-muted-color">
                <i :class="icons.CALENDAR"></i>
                <span class="ml-2">{{ Formatter.getDate(product.deletedAt) }}</span>
              </span>
            </Fieldset>
          </section>

          <!-- Submit Button -->
          <div class="flex justify-end gap-2">
            <CustomButton
              type="submit"
              label="Guardar cambios"
              :disabled="(!meta.dirty && meta.valid) || isPending"
              :loading="isPending"
            />
          </div>
        </form>
      </template>
    </BaseCard>
  </section>
</template>

<style scoped></style>
